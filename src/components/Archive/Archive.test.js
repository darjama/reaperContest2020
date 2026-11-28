/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Archive from './Archive';

jest.mock('axios');

jest.mock('../Results/Results', () => {
  const React = require('react');
  return function MockResults({ contestid }) {
    return React.createElement('div', null, `Results for ${contestid}`);
  };
});

jest.mock('../common/Hero', () => {
  const React = require('react');
  return function MockHero({ name }) {
    return React.createElement('h1', null, name);
  };
});

const NOW = new Date('2026-11-27T12:00:00Z').getTime();

const makeContest = (overrides) => ({
  _id: `id-${overrides.contestid}`,
  contestid: 202501,
  contestlabel: 'January 2025',
  songname: 'Song',
  artist: 'Artist',
  artistimg: 'https://example.com/artist.jpg',
  description: 'Contest description',
  resultdate: '2025-02-01T00:00:00Z',
  ...overrides,
});

const pastContest = makeContest({
  contestid: 202501,
  contestlabel: 'January 2025',
  songname: 'Past Song',
  artist: 'Past Artist',
  artistimg: 'https://example.com/past-artist.jpg',
  description: 'A past contest description',
  resultdate: '2025-02-01T00:00:00Z',
});

const futureContest = makeContest({
  contestid: 202601,
  contestlabel: 'January 2026',
  songname: 'Future Song',
  artist: 'Future Artist',
  artistimg: 'https://example.com/future-artist.jpg',
  description: 'A future contest description',
  resultdate: '2027-02-01T00:00:00Z',
});

const drumContest = makeContest({
  contestid: 202502,
  contestlabel: 'February 2025',
  songname: 'Another Song',
  artist: 'Another Artist',
  artistimg: 'https://example.com/another-artist.jpg',
  description: 'A drum recording contest',
  resultdate: '2025-03-01T00:00:00Z',
});

const renderArchive = async (contests, initialEntry = '/archive') => {
  axios.get.mockResolvedValueOnce({ data: contests });
  const store = createStore((state = { nowReducer: NOW }) => state);
  const view = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Route path='/archive' component={Archive} />
      </MemoryRouter>
    </Provider>
  );
  // The count only appears once the contest list has loaded.
  await screen.findByText(`${contests.length} contests`);
  return view;
};

beforeEach(() => {
  jest.resetAllMocks();
  // jsdom does not provide IntersectionObserver, so the archive list uses
  // its manual "Load more contests" fallback in these tests.
  delete global.IntersectionObserver;
});

test('renders artist images, descriptions and contest availability', async () => {
  await renderArchive([pastContest, futureContest]);

  expect(screen.getByText('Past Song by Past Artist')).toBeTruthy();
  expect(screen.getByText('A past contest description')).toBeTruthy();
  expect(
    screen.getByAltText('Past Artist').getAttribute('src')
  ).toBe('https://example.com/past-artist.jpg');
  expect(screen.getByText('View results')).toBeTruthy();

  const futureCard = screen
    .getByText('Future Song by Future Artist')
    .closest('article');
  expect(futureCard.className).toContain('archive-item--disabled');
  expect(futureCard.getAttribute('role')).toBeNull();
  expect(screen.getByText(/Results available/)).toBeTruthy();

  // Unavailable contests cannot be opened.
  fireEvent.click(screen.getByText('Future Song by Future Artist'));
  expect(screen.queryByText(/Results for/)).toBeNull();
});

test('debounces the search and filters by artist, song and description', async () => {
  const { container } = await renderArchive([
    pastContest,
    futureContest,
    drumContest,
  ]);
  const input = screen.getByLabelText('Search contests');
  const cards = () => container.querySelectorAll('article.archive-item');

  // Several rapid keystrokes must not filter until the user pauses.
  fireEvent.change(input, { target: { value: 'P' } });
  fireEvent.change(input, { target: { value: 'Pa' } });
  fireEvent.change(input, { target: { value: 'Past' } });
  expect(cards()).toHaveLength(3);

  await waitFor(
    () => expect(screen.getByText('1 of 3 contests match "Past"')).toBeTruthy(),
    { timeout: 1000 }
  );
  expect(cards()).toHaveLength(1);
  expect(screen.getByText('Past Song by Past Artist')).toBeTruthy();

  // The description is searchable too.
  fireEvent.change(input, { target: { value: 'drum' } });
  await waitFor(
    () => expect(screen.getByText('1 of 3 contests match "drum"')).toBeTruthy(),
    { timeout: 1000 }
  );
  expect(screen.getByText('Another Song by Another Artist')).toBeTruthy();

  // Clearing is immediate rather than waiting for the debounce.
  fireEvent.change(input, { target: { value: '' } });
  expect(cards()).toHaveLength(3);
  expect(screen.getByText('3 contests')).toBeTruthy();
});

test('loads contests in batches with the load more fallback', async () => {
  const contests = Array.from({ length: 8 }, (_, index) =>
    makeContest({
      contestid: 202501 + index,
      contestlabel: `Contest ${index}`,
      songname: `Song ${index}`,
      artist: `Artist ${index}`,
      resultdate: '2025-02-01T00:00:00Z',
    })
  );

  const { container } = await renderArchive(contests);
  const cards = () => container.querySelectorAll('article.archive-item');

  expect(cards()).toHaveLength(6);

  fireEvent.click(screen.getByRole('button', { name: 'Load more contests' }));

  expect(cards()).toHaveLength(8);
  expect(
    screen.queryByRole('button', { name: 'Load more contests' })
  ).toBeNull();
});

test('opens a contest and returns to the archive list', async () => {
  await renderArchive([pastContest]);

  fireEvent.click(screen.getByText('Past Song by Past Artist'));

  expect(await screen.findByText('Results for 202501')).toBeTruthy();
  expect(screen.queryByLabelText('Search contests')).toBeNull();

  fireEvent.click(screen.getByRole('button', { name: /All contests/ }));

  expect(await screen.findByLabelText('Search contests')).toBeTruthy();
  expect(screen.queryByText('Results for 202501')).toBeNull();
  expect(screen.getByText('Past Song by Past Artist')).toBeTruthy();
});
