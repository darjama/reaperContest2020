/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Contact from './Contact';

jest.mock('axios');

jest.mock('../common/Hero', () => {
  const React = require('react');
  return function MockHero({ name }) {
    return React.createElement('h1', null, name);
  };
});

beforeEach(() => {
  jest.resetAllMocks();
});

test('renders the contact form on its own page', () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeTruthy();
  expect(screen.getByLabelText('Email address')).toBeTruthy();
  expect(screen.getByLabelText('Message')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
});

test('requires a valid email before enabling submit', () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  const submit = screen.getByRole('button', { name: 'Submit' });
  expect(submit.disabled).toBe(true);

  fireEvent.change(screen.getByLabelText('Email address'), {
    target: { value: 'not-an-email' },
  });
  expect(submit.disabled).toBe(true);

  fireEvent.change(screen.getByLabelText('Email address'), {
    target: { value: 'mixer@example.com' },
  });
  expect(submit.disabled).toBe(false);
});

test('shows a sending modal, then posts the message and confirms', async () => {
  let resolvePost;
  axios.post.mockReturnValueOnce(
    new Promise((resolve) => {
      resolvePost = resolve;
    })
  );

  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Email address'), {
    target: { value: 'mixer@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'How do I submit a large file?' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(screen.getByText('Sending...')).toBeTruthy();

  resolvePost({ data: { success: true } });

  await waitFor(() =>
    expect(axios.post).toHaveBeenCalledWith('/api/contactform', {
      email: 'mixer@example.com',
      message: 'How do I submit a large file?',
    })
  );
  expect(await screen.findByText(/message sent/i)).toBeTruthy();
});

test('shows an error modal when sending fails', async () => {
  axios.post.mockRejectedValueOnce(new Error('network error'));

  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Email address'), {
    target: { value: 'mixer@example.com' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(
    await screen.findByText(/error in sending your message/i)
  ).toBeTruthy();
});
