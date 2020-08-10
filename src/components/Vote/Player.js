import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import Bar from './Bar.js';
import '../../css/player.css';


var Player =  function(props) {

  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const audio = document.getElementById("audio");

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

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
        <source src="http://knotmusic.net/grandd/rehearsal-20200227-spleeter.mp3" />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      <div>
      <Button onClick={()=>setPlaying(!playing)}>{playing ? 'Pause': 'Play'}</Button>
      <Button onClick={()=> {setCurTime(0); audio.currentTime = 0; setPlaying(false);} }> Stop </Button>
      </div>

    </div>
  )
}

export default Player;
