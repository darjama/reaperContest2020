import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Illustration from './Illustration.js';
import { getPhase, getTimeline } from './homePhase.js';
import { splitDuration } from '../../redux/date/dateHelpers.js';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const LINKS = {
  rules: ['/getstarted', 'Read the Rules'],
  howToVote: ['/getstarted', 'How Voting Works'],
  submit: ['/submit', 'Submit Your Mix'],
  vote: ['/vote', 'Vote Now'],
  results: ['/results', 'See the Results'],
  archive: ['/archive', 'Browse the Archive'],
};

function useNow() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

const pad = (n) => String(n).padStart(2, '0');

function Countdown({ phase, now }) {
  const { days, hours, minutes, seconds } = splitDuration(phase.target - now);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const parts = [
    [days, 'days'],
    [pad(hours), 'hours'],
    [pad(minutes), 'min'],
    [pad(seconds), 'sec'],
  ];
  return (
    <div className='hm-count'>
      <div className='hm-count-label'>{phase.countdown}</div>
      <div className='hm-digits'>
        {parts.map(([value, unit]) => (
          <div className='hm-digit' key={unit}>
            <b>{value}</b>
            <span>{unit}</span>
          </div>
        ))}
      </div>
      <div className='hm-tz'>Times shown in {timeZone}</div>
    </div>
  );
}

function Timeline({ details, now }) {
  return (
    <ol className='hm-timeline'>
      {getTimeline(details, now).map(({ field, label, date, status }) => (
        <li key={field} className={`hm-event hm-${status}`}>
          <span className='hm-dot' aria-hidden='true'>
            {status === 'done' ? '✓' : ''}
          </span>
          <div>
            <div className='hm-event-name'>{label}</div>
            <div className='hm-event-when'>
              {date
                ? `${date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })} · ${date.toLocaleTimeString('en-US', {
                    timeStyle: 'short',
                  })}`
                : '—'}
            </div>
          </div>
          {status === 'next' ? <span className='hm-badge'>Next</span> : null}
        </li>
      ))}
    </ol>
  );
}

const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter((word) => word && word.toLowerCase() !== 'the')
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

export default function HomeContest({ details, onGetTracks }) {
  const now = useNow();
  // keeps query flags such as ?sh= when moving between pages
  const { search } = useLocation();
  const phase = getPhase(details, now);
  const { month, year, songname, artist, artistimg, description } = details;
  const actions = phase ? phase.actions : ['tracks'];

  return (
    <React.Fragment>
      <header className='hm-hero'>
        <div className='hm-wrap hm-hero-grid'>
          <div>
            <div className='hm-month'>
              {MONTHS[month - 1] ? `${MONTHS[month - 1]} ${year}` : ' '}
            </div>
            <h1 className='hm-phase'>{phase ? phase.title : 'Loading…'}</h1>
            <div className='hm-title'>{songname}</div>
            <div className='hm-artist'>{artist ? `by ${artist}` : ''}</div>
            <p>
              Download the multitracks, mix them in Reaper using native and JSFX
              effects, and submit your mix before the deadline. Then listen to
              everyone else's and vote.
            </p>
            <p>
              New here? Start with{' '}
              <Link to={'/getstarted' + search}>Getting Started</Link>. Chat
              about this month's contest on the{' '}
              <a
                href='https://forums.cockos.com/forumdisplay.php?f=24'
                target='_blank'
                rel='noopener noreferrer'
              >
                Reaper forums
              </a>
              .
            </p>
            <div className='hm-actions'>
              {actions.map((action, i) => {
                const className = `hm-btn ${
                  i === 0 ? 'hm-primary' : 'hm-ghost'
                }`;
                if (action === 'tracks') {
                  return (
                    <button
                      key={action}
                      type='button'
                      className={className}
                      onClick={onGetTracks}
                      disabled={!phase}
                    >
                      Get the Tracks
                    </button>
                  );
                }
                const [to, label] = LINKS[action];
                return (
                  <Link key={action} className={className} to={to + search}>
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className='hm-side'>
            <Illustration />
            {phase && phase.target ? (
              <Countdown phase={phase} now={now} />
            ) : null}
          </div>
        </div>
      </header>

      <div className='hm-wrap hm-cards'>
        <section className='hm-card'>
          <h2>This month's song</h2>
          <div className='hm-song'>
            {artistimg ? (
              <img className='hm-cover' src={artistimg} alt={artist || ''} />
            ) : (
              <div className='hm-cover hm-cover-fallback' aria-hidden='true'>
                {initials(artist)}
              </div>
            )}
            <div>
              <h3>{songname}</h3>
              <small>{artist}</small>
            </div>
          </div>
          <p>{description}</p>
        </section>
        <section className='hm-card'>
          <h2>Contest Schedule</h2>
          <Timeline details={details} now={now} />
        </section>
      </div>
    </React.Fragment>
  );
}
