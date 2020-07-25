import React, {useState, useEffect}  from 'react';
import {Row, Col} from 'react-bootstrap';

var Schedule = function(props) {
  let { startdate, duedate, votestart, voteend, resultdate, nextstart } = props.details;

  let dates = [startdate, duedate, votestart, voteend, resultdate, nextstart].map(a=> new Date(a));

  const labels = ['Contest Start', 'Submissions Due', 'Voting Starts', 'Voting Ends', 'Result Date', 'Next Contest Starts']

  let nextDate = dates.find(a => a > new Date())

  let nextEvent = labels[dates.indexOf(nextDate)]

  let schedule = labels.map((label, i) => (
    <Row key={label} style={{padding:'5px 0'}}>
      <Col xs={5} style={{fontWeight: 'bold'}}>{label}:</Col>
      <Col xs={4}>{dates[i].toLocaleDateString('en-US', options)}</Col>
      <Col>{dates[i].toLocaleTimeString('en-US',{timeStyle: 'short'})}</Col>

      <br/>
    </Row>
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
    return (
      <Row className="rem2">
        <Col/>
        <Col className='countdown-table'>{days}<br/>days</Col>
        <Col className='countdown-table'>{hours}<br/>hours</Col>
        <Col className='countdown-table'>{minutes}<br/>minutes</Col>
        <Col className='countdown-table'>{seconds}<br/>seconds</Col>
        <Col/>
      </Row>
    )
  }

  return (
    <React.Fragment>
      {schedule}
      <br/>
      <div className="text-center rem2">
      Coming up: {nextEvent}
      <br/>
      {countDown()}
      </div>
    </React.Fragment>
  )
}

export default Schedule;