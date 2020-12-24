import React, {useState, useEffect} from 'react';
import Hero from '../common/Hero';
import axios from 'axios';


var Archive = function(props) {

  const [contestList, setContestList] = useState([])

  // useEffect(() => {
  //     axios.get('/api/contestnames/')
  //     .then(data => setContestList(data.data))

  // }, [])

  return (
    <div style={{textAlign: 'center'}}>
      <Hero name='Contest Archives'/>
      <h1 style={{color:'white'}}>Coming Soon ...</h1>
      <h3 style={{color:'white'}}> In the meantime, please visit the <a href='https://reapercontest.wixsite.com/home/archive' target='_blank'>Original Reaper Contest Archive</a>
      </h3>

      {/* <ul>
        {contestList.map(contest => (
          <li key={contest._id}>{contest.contestlabel}</li>
        ))}
      </ul> */}

    </div>
  )
}

export default Archive;