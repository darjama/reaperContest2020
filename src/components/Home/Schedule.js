import React, {useState, useEffect}  from 'react';

var Schedule = function(props) {
  let { startdate, duedate, votestart, voteend, resultdate, nextstart } = props.details;

  let dates = [startdate, duedate, votestart, voteend, resultdate, nextstart].map(a=> new Date(a));

  const labels = ['Contest Start', 'Submissions Due', 'Voting Starts', 'Voting Ends', 'Result Date', 'Next Contest Starts']

  let nextDate = dates.find(a => a > new Date())

  let nextEvent = labels[dates.indexOf(nextDate)]

  let schedule = labels.map((label, i) => (
    <React.Fragment key={label}>
      <span style={{fontWeight: 'bold'}}>{label}:</span> {dates[i].toLocaleTimeString('en-US',{timeStyle: 'short'})} {dates[i].toLocaleDateString('en-US', options)}
      <br/>
    </React.Fragment>
  ))

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    let today = new Date();
    return (dates.find(a => a > today) - today) || 0
  }

  useEffect(() => {
    calculateTimeLeft();
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  function countDown() {
    if (!timeLeft) return '...';
    let seconds = Math.trunc((timeLeft/1000) % 60).toString()
    if (seconds.length === 1) seconds = '0' + seconds;
    let minutes = Math.trunc((timeLeft/1000/60) % 60).toString()
    if (minutes.length === 1) minutes = '0' + minutes;
    let hours = Math.trunc((timeLeft/1000/60/60) % 24).toString()
    if (hours.length === 1) hours = '0' + hours;
    let days = Math.trunc(timeLeft/1000/60/60/24).toString()
    return (days > 0 ? days + ' days, ' : '') + hours + ':' + minutes + ':' + seconds;
  }

  return (
    <React.Fragment>
      {schedule}
      <br/>
      Coming up: {nextEvent}
      <br/>
      in: {countDown()}
    </React.Fragment>
  )
}

export default Schedule;