// Helpers for tracking the contest phase (submission / voting / results)
// while the app stays open, so page availability can update when the
// date or time crosses a contest boundary.

const BOUNDARY_FIELDS = [
  'startdate',
  'duedate',
  'votestart',
  'voteend',
  'resultdate',
  'nextstart',
];

// setTimeout overflows above 2^31 - 1 ms (~24.8 days)
const MAX_TIMEOUT = 2147483647;

const getBoundaries = (details = {}) =>
  BOUNDARY_FIELDS.filter((field) => details?.[field])
    .map((field) => new Date(details?.[field]))
    .filter((date) => !isNaN(date));

const monthKey = (date) => `${date.getFullYear()}-${date.getMonth()}`;

const dayKey = (date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

// Identifies the current contest phase: the calendar day plus how many of
// the contest's phase boundaries have already passed. Availability can only
// change when this key changes.
const phaseKey = (date, boundaries) =>
  `${dayKey(date)}|${boundaries.filter((b) => b <= date).length}`;

// Milliseconds until the next moment page availability may change: the next
// contest phase boundary or midnight, whichever comes first.
const nextWakeDelay = (date, boundaries) => {
  const midnight = new Date(date);
  midnight.setHours(24, 0, 0, 0);
  const upcoming = boundaries.filter((d) => d > date).concat(midnight);
  const next = Math.min(...upcoming.map((d) => d.getTime()));
  return Math.min(Math.max(next - date.getTime(), 0), MAX_TIMEOUT);
};

// Splits a millisecond duration into days/hours/minutes/seconds.
const splitDuration = (ms) => {
  const total = Math.max(Math.floor(ms / 1000), 0);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
};

export {
  splitDuration,
  BOUNDARY_FIELDS,
  MAX_TIMEOUT,
  getBoundaries,
  monthKey,
  dayKey,
  phaseKey,
  nextWakeDelay,
};
