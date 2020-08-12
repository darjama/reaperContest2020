import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../redux/notes/notesActions';
import {Card, Form, Button} from 'react-bootstrap'

var VoteCard = function({entry, contestId}) {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.noteReducer);
  const note = notes[entry.mixnum];


  const changeHandler = function(e) {
    console.log(e.target.value);
    const payload = {};
    payload[entry.mixnum] = e.target.value;
    payload.contestId = contestId;
    dispatch(updateNote(payload));
    localStorage.setItem('contestNotes', JSON.stringify(notes));
  }

  const clickHandler = function() {}
  const voteHandler = function() {}
  return (
    <Card width='20rem' className='addNowPlayingLater'>
      <Card.Title>Mix # {entry.mixnum}
        <Button variant="secondary" onClick={() => clickHandler}>Add to Playlist</Button>
        <Button variant="secondary" onClick={() => clickHandler}>Play Now</Button>
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