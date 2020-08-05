import React, {useState, useEffect} from 'react';
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
    <div className="audio-player" onClick={()=>setPlaying(!playing)}>
      <audio id="audio">
        <source src="http://knotmusic.net/grandd/old/rehearsal-20170112.mp3" />
        Your browser does not support the <code>audio</code> element.
      </audio>

    </div>
  )
}

export default Player;
