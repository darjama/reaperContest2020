import React from 'react';
import { connect } from 'react-redux';
import { tick } from '../../redux/date/dateActions';
import { fetchContestDetails } from '../../redux/contestDetails/contestDetailActions';
import { fetchEntriesDetails } from '../../redux/entries/entriesActions';
import {
  getBoundaries,
  monthKey,
  phaseKey,
  nextWakeDelay,
} from '../../redux/date/dateHelpers';

// Watches the clock while the app stays open. It wakes up exactly when the
// contest phase changes (submission due, voting starts/ends, results date,
// ...) or at midnight, and again whenever the tab regains focus (covers
// laptops waking from sleep). When the phase or day has changed it ticks the
// store so every availability gate (NotNow modal, Submit, Vote, Archive,
// Results) re-evaluates against the current date. When the month itself
// rolls over it reloads the new contest's details and entries.
function DateWatcher({
  details,
  tick,
  fetchContestDetails,
  fetchEntriesDetails,
}) {
  const boundaries = React.useMemo(() => getBoundaries(details), [details]);
  const seen = React.useRef({ phase: null, month: monthKey(new Date()) });

  React.useEffect(() => {
    let timer;
    // seed the current phase so the first wake-up doesn't tick needlessly
    if (seen.current.phase === null) {
      seen.current.phase = phaseKey(new Date(), boundaries);
    }

    const check = () => {
      const now = new Date();
      const phase = phaseKey(now, boundaries);
      const month = monthKey(now);
      const phaseChanged = phase !== seen.current.phase;
      const monthChanged = month !== seen.current.month;
      seen.current = { phase, month };
      if (phaseChanged) tick();
      if (monthChanged) {
        fetchContestDetails();
        fetchEntriesDetails();
      }
    };

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(
        () => {
          check();
          schedule();
        },
        nextWakeDelay(new Date(), boundaries)
      );
    };

    const onVisible = () => {
      if (document.hidden) return;
      check();
      schedule();
    };

    schedule();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
    };
  }, [boundaries, tick, fetchContestDetails, fetchEntriesDetails]);

  return null;
}

const mapStateToProps = (state) => {
  return {
    details: state.contestDetailReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tick: () => dispatch(tick()),
    fetchContestDetails: () => dispatch(fetchContestDetails()),
    fetchEntriesDetails: () => dispatch(fetchEntriesDetails()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateWatcher);
