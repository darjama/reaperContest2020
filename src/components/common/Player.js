import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playLink } from '../../redux/playlist/playlistActions';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Bar from './Bar.js';
import MarkerList from './MarkerList';
import '../../css/player.css';
import { withRouter } from 'react-router-dom';

var Player = function ({ songName, markers }) {
  const [endOfRange, setEndOfRange] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10000);
  const [clickedTime, setClickedTime] = useState();
  const [normalize, setNormalize] = useState(true);
  const nowPlaying = useSelector((state) => state.playNowReducer);
  const playlist = useSelector((state) => state.playlistReducer);
  const dispatch = useDispatch();
  const offset = nowPlaying.offset || 0;

  useEffect(() => {
    const audio = document.getElementById('audio');
    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
      if (
        markers &&
        markers.length &&
        endTime > markers[markers.length - 2].time &&
        audio.duration > 5
      )
        setEndTime(audio.duration - 0.5);
    };
    if (
      normalize &&
      nowPlaying.normalize !== undefined &&
      nowPlaying.normalize <= 0
    ) {
      audio.volume = Math.pow(10, Number(nowPlaying.normalize) / 20);
    } else {
      audio.volume = 1;
    }

    const endOfSong = () => {
      setEndOfRange(false);
      if (!nowPlaying.next) {
        audio.currentTime = startTime - (startTime > 0 ? offset : 0);
      } else {
        dispatch(playLink(nowPlaying.next));
      }
    };

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener('loadeddata', setAudioData);

    audio.addEventListener('timeupdate', setAudioTime);

    const endRange = function () {
      setPlaying(false);
      setEndOfRange(true);
    };

    // React state listeners: update DOM on React state changes
    playing && (audio.paused || audio.ended) ? audio.play() : '';
    !playing && !audio.paused && !audio.ended ? audio.pause() : '';
    endOfRange ? endOfSong() : '';
    !audio.paused &&
    audio.currentTime >=
      endTime - (endTime > markers[markers.length - 2].time ? 0 : offset)
      ? endRange()
      : '';

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  });

  useEffect(() => {
    audio.load();
    audio.loop = false;
    if (playCount) {
      audio.currentTime = startTime - (startTime > 0 ? offset : 0);
      setPlaying(true);
    } else {
      setPlayCount(playCount + 1);
    }
  }, [nowPlaying]);

  return (
    <div className='audio-player'>
      <audio id='audio'>
        <source src={nowPlaying.uri} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <h3>
        {nowPlaying.name !== 'Please Vote (but not for yourself)!'
          ? songName
          : ''}{' '}
        {nowPlaying.name}
      </h3>
      <Bar
        curTime={curTime}
        duration={duration}
        onTimeUpdate={(time) => setClickedTime(time)}
      />
      <div className='player-button-holder'>
        <Button className='player-button' onClick={() => setPlaying(!playing)}>
          {playing ? 'Pause' : 'Play'}
        </Button>
        <Button
          className='player-button'
          disabled={!nowPlaying.prev}
          onClick={() => dispatch(playLink(nowPlaying.prev))}
        >
          {' '}
          {`|<<`}{' '}
        </Button>
        <Button
          className='player-button'
          onClick={() => {
            audio.currentTime -= 30;
          }}
        >
          {' '}
          {`<<`}{' '}
        </Button>
        <Button
          className='player-button'
          onClick={() => {
            audio.currentTime += 30;
          }}
        >
          {' '}
          >>{' '}
        </Button>
        <Button
          className='player-button'
          disabled={!nowPlaying.next}
          onClick={() => dispatch(playLink(nowPlaying.next))}
        >
          {' '}
          {`>>|`}{' '}
        </Button>
        <Button
          className='player-button'
          onClick={() => {
            audio.currentTime = startTime;
            setPlaying(false);
          }}
        >
          {' '}
          Stop{' '}
        </Button>
      </div>
      <Row xs='auto'>
        <Col>
          <Form inline>
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Check
                type='checkbox'
                checked={normalize}
                className='big-checkbox'
                value={normalize}
                onChange={() => {
                  setNormalize(!normalize);
                }}
              />
              <Form.Label>Normalize</Form.Label>
            </Form.Group>
          </Form>
        </Col>
        <Col xs='auto' />
        <Col xs={50}>
          {!!markers && !!markers.length && (
            <MarkerList
              markers={markers}
              start={startTime}
              end={endTime}
              setEnd={setEndTime}
              setStart={setStartTime}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(Player);
