import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import Bar from './Bar.js';
import '../../css/player.css';


var Player =  function(props) {

  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const audio = document.getElementById("audio");

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const endOfSong= () => {
      setPlaying(false);  //need to add playlist handling later;
      audio.currentTime = 0;
    }

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();
    curTime >= duration -.01 ? endOfSong() : '';

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    }
  });

  return (
    <div className="audio-player" >
      <audio id="audio">
        <source src="http://flac.reamixed.com/202008/EricRacy_Higher_Mix_01.flac" />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      <div className='player-button-holder'>
        <Button className='player-button' onClick={()=>setPlaying(!playing)}>{playing ? 'Pause': 'Play'}</Button>
        <Button className='player-button' onClick={()=> {audio.currentTime -= 30;} }> {`<<`} </Button>
        <Button className='player-button' onClick={()=> {audio.currentTime += 30;} }> >> </Button>
        <Button className='player-button' onClick={()=> {audio.currentTime = 0; setPlaying(false);} }> Stop </Button>
      </div>

    </div>
  )
}

export default Player;
