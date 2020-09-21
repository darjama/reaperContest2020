import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playLink } from '../../redux/playlist/playlistActions';
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
  const nowPlaying = useSelector(state => state.playNowReducer);
  const playlist = useSelector(state => state.playlistReducer);
  const dispatch = useDispatch();

  useEffect(() => {

    const audio = document.getElementById("audio");
    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const endOfSong= () => {
      if(!nowPlaying.next) {
        setPlaying(false);
        audio.currentTime = 0;
      } else {
        dispatch(playLink(nowPlaying.next))
      }
    }

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();
    curTime >= duration -.1 ? endOfSong() : '';

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

  useEffect(() => {
    audio.load();
    if (nowPlaying.name !== 'Please Vote (but not for yourself)!') {
      setPlaying(true)
    }
  }, [nowPlaying] )




  return (
    <div className="audio-player" >
      <audio id="audio">
        <source src={nowPlaying.uri}/>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <h1>{nowPlaying.name}</h1>
      <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      <div className='player-button-holder'>
        <Button className='player-button' onClick={()=>setPlaying(!playing)}>{playing ? 'Pause': 'Play'}</Button>
        <Button className='player-button' disabled={!nowPlaying.prev} onClick={()=> dispatch(playLink(nowPlaying.prev)) }> {`|<<`} </Button>
        <Button className='player-button' onClick={()=> {audio.currentTime -= 30;} }> {`<<`} </Button>
        <Button className='player-button' onClick={()=> {audio.currentTime += 30;} }> >> </Button>
        <Button className='player-button' disabled={!nowPlaying.next} onClick={()=> dispatch(playLink(nowPlaying.next)) }> {`>>|`} </Button>
        <Button className='player-button' onClick={()=> {audio.currentTime = 0; setPlaying(false);} }> Stop </Button>
      </div>

    </div>
  )
}

export default Player;
