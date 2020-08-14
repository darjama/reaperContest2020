import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../redux/notes/notesActions';
import { playLink } from '../../redux/playlist/playlistActions';
import {Card, Form, Button} from 'react-bootstrap'

var VoteCard = function({entry, contestId}) {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.noteReducer);
  const note = notes[entry.mixnum];

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


  const changeHandler =  function(e) {
    const payload = {};
    payload[entry.mixnum] = e.target.value;
    payload.contestId = contestId;
    dispatch(updateNote(payload));
  }

  useEffect(()=>{
    debounce(localStorage.setItem('contestNotes', JSON.stringify(notes)), 500);
  }, [notes])

  const clickHandler = function() {}
  const voteHandler = function() {}

  const nextObj = { //for testing purposes
    next: null,
    prev: playObj,
    uri: 'http://flac.reamixed.com/202008/04.flac',
    name: 'Mix #4'
  }

  const playObj = {
    next: nextObj,
    prev: null,
    uri: 'http://flac.reamixed.com/' + entry.contestid + '/' + entry.audiouri,
    name: 'Mix #' + entry.mixnum
  }


  return (
    <Card width='20rem' className='addNowPlayingLater'>
      <Card.Title>Mix # {entry.mixnum}
        <Button variant="secondary" onClick={() => clickHandler}>Add to Playlist</Button>
        <Button variant="secondary" onClick={() => dispatch(playLink(playObj))}>Play Now</Button>
      </Card.Title>
      <Card.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea"  autoComplete="off" value={note} rows="4" onChange={() => changeHandler(event)}>
            </Form.Control>
          </Form.Group>
        </Form>


        <br/>
        Vote :
        <Button variant="primary" key='one' onClick={() => voteHandler}>1st</Button>
        <Button variant="primary" key='two' onClick={() => voteHandler}>2nd</Button>
        <Button variant="primary" key='three' onClick={() => voteHandler}>3rd</Button>
        <Button variant="primary" key='clear' onClick={() => voteHandler}>clear</Button>
      </Card.Body>
    </Card>
  )
}

export default VoteCard;