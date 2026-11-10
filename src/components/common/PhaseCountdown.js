import React, { useState, useEffect } from 'react';
import { splitDuration } from '../../redux/date/dateHelpers';

const PhaseCountdown = ({ label, targetDate, isActive }) => {
  // depend on the numeric value so a fresh Date object on every parent
  // render doesn't restart the interval
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isActive || isNaN(target)) {
      setTimeLeft(0);
      return;
    }

    const update = () => {
      const distance = target - Date.now();
      setTimeLeft(distance > 0 ? distance : 0);
      return distance;
    };

    // show the real remaining time immediately instead of waiting a second
    if (update() <= 0) return;
    const timer = setInterval(() => {
      if (update() <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, target]);

  if (!isActive || timeLeft <= 0) return null;

  const { days, hours, minutes, seconds } = splitDuration(timeLeft);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span className='countdown-label'>{label}:</span>
      {days > 0 && <span className='countdown-table'>{days}d </span>}
      <span className='countdown-table'>{hours}h </span>
      <span className='countdown-table'>{minutes}m </span>
      <span className='countdown-table'>{seconds}s</span>
    </div>
  );
};

export default PhaseCountdown;
