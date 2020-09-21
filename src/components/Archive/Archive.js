import React from 'react';
import Hero from '../common/Hero';


var Archive = function(props) {
  return (
    <div style={{textAlign: 'center'}}>
      <Hero name='Contest Archives'/>
      <h1 style={{color:'white'}}>Coming Soon ...</h1>
      <h3 style={{color:'white'}}> In the meantime, please visit the <a href='https://reapercontest.wixsite.com/home/archive' target='_blank'>Original Reaper Contest Archive</a>
      </h3>
    </div>
  )
}

export default Archive;