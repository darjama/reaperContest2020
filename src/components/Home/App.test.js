import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App.js';

// Carousel imports images and css that jest cannot transform
jest.mock('./Carousel.js', () => ({
  __esModule: true,
  default: () => 'HEADER_CAROUSEL',
}));

// DownloadModal renders nothing while it is closed, so a sentinel text
// makes its presence in the output observable
jest.mock('./DownloadModal.js', () => ({
  __esModule: true,
  default: () => 'DOWNLOAD_MODAL',
}));

const NO_CONTEST_MESSAGE =
  'There is no contest currently available, please check back soon. Use the contact form below if you believe you are getting this message in error.';

const details = {
  month: 11,
  year: 2026,
  songname: 'Test Song',
  artist: 'Test Artist',
  artistimg: 'test.jpg',
  description: 'A song for testing.',
  rawuri: '/downloads/test.zip',
  startdate: '2026-11-01T00:00:00',
  duedate: '2026-11-15T23:59:00',
  votestart: '2026-11-16T00:00:00',
  voteend: '2026-11-25T23:59:00',
  resultdate: '2026-11-27T20:00:00',
  nextstart: '2026-12-01T00:00:00',
};

function renderApp(contestDetails) {
  const store = createStore(
    (state = { contestDetailReducer: contestDetails }) => state
  );
  return renderToString(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

test('renders the no contest message instead of the contest cards when details is null', () => {
  const html = renderApp(null);
  expect(html).toContain(NO_CONTEST_MESSAGE);
  expect(html).toContain('HEADER_CAROUSEL');
  expect(html).toContain('reaMIXed');
  expect(html).not.toContain('Get the Tracks');
  expect(html).not.toContain('Contest Schedule');
  expect(html).not.toContain('DOWNLOAD_MODAL');
});

test('keeps rendering the contest cards without the no contest message while details is loading', () => {
  const html = renderApp({});
  expect(html).not.toContain('There is no contest currently available');
  expect(html).toContain('HEADER_CAROUSEL');
  expect(html).toContain('reaMIXed');
  expect(html).toContain('Get the Tracks');
  expect(html).toContain('Contest Schedule');
});

test('renders the contest cards when a contest exists', () => {
  const html = renderApp(details);
  expect(html).not.toContain('There is no contest currently available');
  expect(html).toContain('HEADER_CAROUSEL');
  expect(html).toContain('reaMIXed');
  // react-dom/server separates adjacent text children with comment markers
  expect(html).toContain('November');
  expect(html).toContain('2026');
  expect(html).toContain('Test Song');
  expect(html).toContain('Get the Tracks');
  expect(html).toContain('Contest Schedule');
  expect(html).toContain('DOWNLOAD_MODAL');
});
