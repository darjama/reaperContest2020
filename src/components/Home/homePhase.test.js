import { getPhase, getTimeline } from './homePhase';

const details = {
  startdate: '2026-11-01T00:00:00',
  duedate: '2026-11-15T23:59:00',
  votestart: '2026-11-16T00:00:00',
  voteend: '2026-11-25T23:59:00',
  resultdate: '2026-11-27T20:00:00',
  nextstart: '2026-12-01T00:00:00',
};

const at = (value) => new Date(value);

test.each([
  ['2026-10-30T12:00:00', 'upcoming', 'startdate', '/submit'],
  ['2026-11-10T12:00:00', 'mixing', 'duedate', '/submit'],
  ['2026-11-15T23:59:30', 'closed', 'votestart', '/archive'],
  ['2026-11-20T12:00:00', 'voting', 'voteend', '/vote'],
  ['2026-11-26T12:00:00', 'tallying', 'resultdate', '/archive'],
  ['2026-11-28T12:00:00', 'results', 'nextstart', '/results'],
])('at %s the phase is %s', (now, key, target, nav) => {
  const phase = getPhase(details, at(now));
  expect(phase.key).toBe(key);
  expect(phase.target).toEqual(at(details[target]));
  expect(phase.nav).toBe(nav);
});

test('a phase starts exactly on its boundary', () => {
  expect(getPhase(details, at(details.duedate)).key).toBe('closed');
});

test('there is no countdown once the last date has passed', () => {
  expect(getPhase(details, at('2026-12-02T00:00:00')).target).toBeNull();
});

test('there is no phase while details are missing', () => {
  expect(getPhase({}, new Date())).toBeNull();
  expect(getPhase(null, new Date())).toBeNull();
});

test('the timeline marks past events done and only one as next', () => {
  const statuses = getTimeline(details, at('2026-11-20T12:00:00')).map(
    (event) => event.status
  );
  expect(statuses).toEqual([
    'done',
    'done',
    'done',
    'next',
    'later',
    'later',
  ]);
});
