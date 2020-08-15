import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../redux/notes/notesActions';
import { playLink } from '../../redux/playlist/playlistActions';
import { ListGroup, Form, Button, Toast } from 'react-bootstrap';
import axios from 'axios';

var SubmitVote = function() {
  const notesAll = useSelector(state => state.noteReducer)
  const top3 = useSelector(state => state.voteReducer)

const [includeNotes, setIncludeNotes] = useState(false);
const [disableSubmit, setDisableSubmit] = useState(false);
const [toastText, setToastText] = useState('');
const [showToast, setShowToast] = useState(false);

const submitHandler = function(e) {
  e.preventDefault();
  setDisableSubmit(true);
  let [first, second, third] = top3;
  const notes = includeNotes ? notesAll : {} ;
  const contestId = new Date().getFullYear()* 100 + new Date().getMonth + 1;
  axios.post('/api/addVote', {first, second, third, notes})
    .then(res => {
      localStorage.setItem('lastVoted', contestId)
    })
    .catch(err => console.log(err))
}


  return (
    <div>
      <ListGroup>
        <ListGroup.Item>1st: {top3[0] ? `Mix# ${top3[0]}` : ''}</ListGroup.Item>
        <ListGroup.Item>2nd: {top3[1] ? `Mix# ${top3[1]}` : ''}</ListGroup.Item>
        <ListGroup.Item>3rd: {top3[2] ? `Mix# ${top3[2]}` : ''}</ListGroup.Item>
      </ListGroup>
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Include notes with votes" onClick={()=>setIncludeNotes(!includeNotes)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => submitHandler(event)}> Submit </Button>
      </Form>
    </div>
  )
}

export default SubmitVote;