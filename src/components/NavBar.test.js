import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar.js';

const details = {
  startdate: '2026-11-01T00:00:00',
  duedate: '2026-11-15T23:59:00',
  votestart: '2026-11-16T00:00:00',
  voteend: '2026-11-25T23:59:00',
  resultdate: '2026-11-27T20:00:00',
  nextstart: '2026-12-01T00:00:00',
};

// the text of every menu item carrying the highlight
function highlighted(contestDetails, now) {
  const store = createStore((state) => state, {
    contestDetailReducer: contestDetails,
    nowReducer: new Date(now).getTime(),
  });
  const html = renderToString(
    <Provider store={store}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );
  return [...html.matchAll(/class="[^"]*nav-cta[^"]*"[^>]*>([^<]+)</g)].map(
    (match) => match[1]
  );
}

test.each([
  ['2026-11-10T12:00:00', 'Submit Your Mix'],
  ['2026-11-15T23:59:30', 'Archive'],
  ['2026-11-20T12:00:00', 'Vote'],
  ['2026-11-26T12:00:00', 'Archive'],
  ['2026-11-28T12:00:00', 'Results'],
])('at %s only %s is highlighted', (now, label) => {
  expect(highlighted(details, now)).toEqual([label]);
});

test('nothing is highlighted while loading or without a contest', () => {
  expect(highlighted({}, '2026-11-10')).toEqual([]);
  expect(highlighted(null, '2026-11-10')).toEqual([]);
});
