import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../redux/notes/notesActions';
import {
  playLink,
  addTrack,
  rerenderNow,
} from '../../redux/playlist/playlistActions';
import { addVote } from '../../redux/voting/voteActions';
import { Card, Form, Button } from 'react-bootstrap';
import { RiPlayFill, RiPlayListAddLine } from 'react-icons/ri';

var VoteCard = function ({ entry, contestId, prefix, excluded }) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.noteReducer);
  const nowPlaying = useSelector((state) => state.playNowReducer);
  const top3 = useSelector((state) => state.voteReducer);
  const note = notes[entry.mixnum];
  const [starValue, setStarValue] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const setHover = function (e) {
    setHoveredStars(
      Math.floor(
        (e.nativeEvent.offsetX / e.nativeEvent.srcElement.offsetWidth) * 10
      ) /
        2 +
        0.5
    );
  };

  const setStars = function (e) {
    setStarValue(
      Math.floor(
        (e.nativeEvent.offsetX / e.nativeEvent.srcElement.offsetWidth) * 10
      ) /
        2 +
        0.5
    );
  };

  const starColor = hoveredStars ? 'darkgrey' : 'gold';
  const starCount = hoveredStars ? hoveredStars : starValue;

  const changeHandler = function (e) {
    const payload = {};
    payload[entry.mixnum] = e.target.value;
    payload.contestId = contestId;
    dispatch(updateNote(payload));
  };

  useEffect(() => {
    debounce(localStorage.setItem('contestNotes', JSON.stringify(notes)), 500);
  }, [notes]);

  const voteHandler = function (e) {
    dispatch(addVote(e.target.value, entry.mixnum));
  };

  const playObj = {
    next: null,
    prev: null,
    uri:
      'https://flac.reamixed.com/' +
      contestId +
      '/' +
      prefix +
      ('0' + entry.mixnum).slice(-2) +
      '.flac',
    mixnum: entry.mixnum,
    name: 'Mix #' + entry.mixnum,
    offset: entry.offset || 0,
    normalize: entry.normalize || 0,
  };

  const classnames =
    'votecard' + (nowPlaying.mixnum === entry.mixnum ? ' nowPlaying' : '');
  return (
    <Card className={classnames}>
      <Card.Title as='div' className='flex-row-spaced'>
        <div>Mix # {entry.mixnum}</div>
        <div>
          <Button
            style={{ margin: '0 5px 0 20px' }}
            title='Add to Playlist'
            alt='Add to Playlist'
            variant='secondary'
            onClick={() => {
              dispatch(addTrack(entry));
              dispatch(rerenderNow());
            }}
          >
            <RiPlayListAddLine />
          </Button>
          <Button
            style={{ margin: '0 5px 0 20px' }}
            title='Play Now'
            alt='Play Now'
            variant='secondary'
            onClick={() => dispatch(playLink(playObj))}
          >
            <RiPlayFill />
          </Button>
        </div>
      </Card.Title>
      <Card.Body>
        <Form>
          <Form.Group controlId='notes'>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as='textarea'
              autoComplete='off'
              value={note}
              rows='4'
              onChange={() => changeHandler(event)}
            ></Form.Control>
          </Form.Group>

          <div key={`inline-radio`} className='mb-3'>
            Vote :&nbsp;
            <div
              style={{
                display: 'inline-block',
                background: `linear-gradient(90deg, ${starColor} ${
                  (100 * starCount) / 5
                }%, white ${(100 * starCount) / 5}%)`,
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  color: 'white',
                  mixBlendMode: 'darken',
                  backgroundColor: '#343a40',
                }}
                onClick={setStars}
                onMouseMove={setHover}
                onMouseLeave={() => setHoveredStars(0)}
              >
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
            </div>
            &nbsp;{starValue}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default VoteCard;
