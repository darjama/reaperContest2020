import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearVotes } from '../../redux/voting/voteActions';
import { clearNotes } from '../../redux/notes/notesActions'
import { playLink } from '../../redux/playlist/playlistActions';
import { ListGroup, Form, Button } from 'react-bootstrap';
import axios from 'axios';

var SubmitVote = function() {
  const notesAll = useSelector(state => state.noteReducer)
  const top3 = useSelector(state => state.voteReducer)
  const dispatch = useDispatch();

  const [includeNotes, setIncludeNotes] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const contestId = ((new Date()).getFullYear()* 100 + (new Date()).getMonth() + 1).toString();


  const submitHandler = function(e) {
    e.preventDefault();
    setDisableSubmit(true);
    let [first, second, third] = top3;
    const notes = includeNotes ? notesAll : {} ;
    axios.post('/api/addVote', {first, second, third, notes})
      .then(res => {
        localStorage.setItem('lastVoted', contestId)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (localStorage.getItem('lastVoted') === contestId) {
      setDisableSubmit(true);
    }
  },[])

  if (!disableSubmit) {
    return (
      <div className='submitvote'>
        <ListGroup>
        <ListGroup.Item variant='dark'><h1>Submit Your Vote:</h1></ListGroup.Item>
          <ListGroup.Item variant='dark'>
            1st place (3 points):
            <span style={{color: 'red'}}>{top3[0] ? ` Mix# ${top3[0]}` : ''}</span>
          </ListGroup.Item>
          <ListGroup.Item variant='dark'>
            2nd place (2 points):
            <span style={{color: 'red'}}>{top3[1] ? ` Mix# ${top3[1]}` : ''}</span>
          </ListGroup.Item>
          <ListGroup.Item variant='dark'>
            3rd place (1 point):
            <span style={{color: 'red'}}>{top3[2] ? ` Mix# ${top3[2]}` : ''}</span>
          </ListGroup.Item>
          <ListGroup.Item variant='dark' className='playerparent'>
            <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Include your notes with your vote" onClick={()=>setIncludeNotes(!includeNotes)}/>
              </Form.Group>
            </Form>
            <div style={{margin:'0 0 0 auto'}}>
              <Button variant="primary" type="submit" disabled={top3.includes(null)} onClick={() => submitHandler(event)}> Submit </Button>
            </div>

          </ListGroup.Item>

        </ListGroup>

      </div>
    )
  }
  return (
    <div className='submitvote' style={{placeItems:'center', color: 'white'}}>
      <h2>Thanks for voting!</h2>
      <h2>Come back at the end of the month to see the results.</h2>
      <Button onClick={() => {
        setDisableSubmit(false);
        dispatch(clearVotes());
        dispatch(clearNotes());
        localStorage.removeItem('lastVoted');
        localStorage.removeItem('contestNotes')} }>
        Give someone else a turn to vote
      </Button>
    </div>
  )


}

export default SubmitVote;