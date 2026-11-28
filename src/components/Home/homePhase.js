// Works out what the site should say for the current point in the contest.

export const EVENTS = [
  ['startdate', 'Contest Start'],
  ['duedate', 'Submissions Due'],
  ['votestart', 'Voting Starts'],
  ['voteend', 'Voting Ends'],
  ['resultdate', 'Results Announced'],
  ['nextstart', 'Next Contest Starts'],
];

// `nav` is the menu item highlighted during the phase.
// Actions are keys into the buttons rendered by HomeContest. The first one in
// each list is the primary button.
const PHASES = {
  upcoming: {
    title: 'Starting Soon',
    nav: '/submit',
    countdown: 'Contest starts in',
    target: 'startdate',
    actions: ['rules', 'archive'],
  },
  mixing: {
    title: 'Now Mixing',
    nav: '/submit',
    countdown: 'Submissions due in',
    target: 'duedate',
    actions: ['tracks', 'submit'],
  },
  closed: {
    title: 'Submissions Closed',
    nav: '/archive',
    countdown: 'Voting opens in',
    target: 'votestart',
    actions: ['howToVote', 'tracks'],
  },
  voting: {
    title: 'Voting Is Open',
    nav: '/vote',
    countdown: 'Voting ends in',
    target: 'voteend',
    actions: ['vote', 'tracks'],
  },
  tallying: {
    title: 'Voting Closed',
    nav: '/archive',
    countdown: 'Results announced in',
    target: 'resultdate',
    actions: ['archive', 'tracks'],
  },
  results: {
    title: 'Results Are In',
    nav: '/results',
    countdown: 'Next contest starts in',
    target: 'nextstart',
    actions: ['results', 'archive'],
  },
};

const parse = (value) => {
  const date = value ? new Date(value) : null;
  return date && !isNaN(date) ? date : null;
};

// Returns null while the contest details are still loading. A missing date
// leaves its phase boundary unreached.
export const getPhase = (details, now) => {
  if (!details || !parse(details.startdate)) return null;
  const passed = (field) => {
    const date = parse(details[field]);
    return date !== null && date <= now;
  };

  let key = 'upcoming';
  if (passed('resultdate')) key = 'results';
  else if (passed('voteend')) key = 'tallying';
  else if (passed('votestart')) key = 'voting';
  else if (passed('duedate')) key = 'closed';
  else if (passed('startdate')) key = 'mixing';

  const phase = PHASES[key];
  const target = parse(details[phase.target]);
  return {
    ...phase,
    key,
    target: target && target > now ? target : null,
  };
};

// One entry per schedule row, flagged as done, next or still to come.
export const getTimeline = (details, now) => {
  let foundNext = false;
  return EVENTS.map(([field, label]) => {
    const date = parse(details && details[field]);
    let status = 'later';
    if (date && date <= now) status = 'done';
    else if (date && !foundNext) {
      status = 'next';
      foundNext = true;
    }
    return { field, label, date, status };
  });
};
