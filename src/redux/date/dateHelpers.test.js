import {
  MAX_TIMEOUT,
  getBoundaries,
  monthKey,
  phaseKey,
  nextWakeDelay,
  splitDuration,
} from './dateHelpers';

test('splitDuration breaks a duration into d/h/m/s', () => {
  const ms = ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000 + 999;
  expect(splitDuration(ms)).toEqual({
    days: 2,
    hours: 3,
    minutes: 4,
    seconds: 5,
  });
  expect(splitDuration(59 * 1000)).toEqual({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 59,
  });
  expect(splitDuration(-5)).toEqual({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
});

const details = {
  startdate: '2026-10-01T00:00:00',
  duedate: '2026-10-15T23:59:00',
  votestart: '2026-10-16T00:00:00',
  voteend: '2026-10-25T23:59:00',
  resultdate: '2026-10-27T20:00:00',
  nextstart: '2026-11-01T00:00:00',
};

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

test('getBoundaries parses every present contest date', () => {
  const boundaries = getBoundaries(details);
  expect(boundaries).toHaveLength(6);
  expect(boundaries[0]).toEqual(new Date(details.startdate));
  expect(boundaries[5]).toEqual(new Date(details.nextstart));
});

test('getBoundaries ignores missing, empty and invalid dates', () => {
  expect(getBoundaries()).toEqual([]);
  expect(getBoundaries({})).toEqual([]);
  expect(
    getBoundaries({ startdate: '', duedate: null, votestart: 'not a date' })
  ).toEqual([]);
});

test('phaseKey changes when a phase boundary is crossed', () => {
  const boundaries = getBoundaries(details);
  // before the contest starts: no boundaries passed
  expect(phaseKey(new Date(2026, 8, 30, 12), boundaries)).toBe('2026-8-30|0');
  // during submissions: only startdate passed
  expect(phaseKey(new Date(2026, 9, 10, 12), boundaries)).toBe('2026-9-10|1');
  // during voting: startdate, duedate and votestart passed
  expect(phaseKey(new Date(2026, 9, 20, 12), boundaries)).toBe('2026-9-20|3');
  // after results are published
  expect(phaseKey(new Date(2026, 9, 28, 12), boundaries)).toBe('2026-9-28|5');
});

test('phaseKey changes with the day even between boundaries', () => {
  const boundaries = getBoundaries(details);
  expect(phaseKey(new Date(2026, 9, 10, 12), boundaries)).not.toBe(
    phaseKey(new Date(2026, 9, 11, 12), boundaries)
  );
});

test('phaseKey stays stable while nothing changes', () => {
  const boundaries = getBoundaries(details);
  expect(phaseKey(new Date(2026, 9, 10, 12), boundaries)).toBe(
    phaseKey(new Date(2026, 9, 10, 18, 30), boundaries)
  );
});

test('monthKey identifies the contest month', () => {
  expect(monthKey(new Date(2026, 9, 31))).toBe('2026-9');
  expect(monthKey(new Date(2026, 10, 1))).toBe('2026-10');
});

test('nextWakeDelay waits for the nearest phase boundary', () => {
  const boundaries = getBoundaries(details);
  // 11pm on the due date: the deadline (59 minutes away) comes before midnight
  const now = new Date(2026, 9, 15, 23, 0, 0);
  const duedate = new Date(details.duedate);
  expect(nextWakeDelay(now, boundaries)).toBe(duedate - now);
});

test('nextWakeDelay falls back to midnight when all boundaries passed', () => {
  const boundaries = getBoundaries(details);
  const now = new Date(2026, 10, 5, 23);
  expect(nextWakeDelay(now, boundaries)).toBe(HOUR);
});

test('nextWakeDelay never exceeds the setTimeout limit', () => {
  const now = new Date(2026, 9, 10, 12);
  const far = new Date(now.getTime() + 30 * DAY);
  expect(nextWakeDelay(now, [far])).toBeLessThanOrEqual(MAX_TIMEOUT);
  expect(nextWakeDelay(now, [])).toBeLessThanOrEqual(MAX_TIMEOUT);
  expect(MAX_TIMEOUT).toBe(2147483647);
});
