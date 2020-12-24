import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearVotes } from '../../redux/voting/voteActions';
import { clearNotes } from '../../redux/notes/notesActions'
import { playLink } from '../../redux/playlist/playlistActions';
import { validateEmail }from '../common/SharedFormulas';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { addVote } from '../../redux/voting/voteActions';
import axios from 'axios';

var SubmitVote = function({voter, setExcluded}) {
  const notesAll = useSelector(state => state.noteReducer)
  const top3 = useSelector(state => state.voteReducer)
  const dispatch = useDispatch();

  const [includeNotes, setIncludeNotes] = useState(false);
  const [email, setEmail] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);
  const contestId = ((new Date()).getFullYear()* 100 + (new Date()).getMonth() + 1).toString();


  const submitHandler = function(e) {
    e.preventDefault();
    setDisableSubmit(true);
    let [first, second, third] = top3;
    const notes = includeNotes ? notesAll : {} ;
    const respondant = voter ? voter.mixnum + '-' + voter.contestant : email;
    axios.post('/api/addVote', {first, second, third, notes, respondant})
      .then(res => {
        localStorage.setItem('lastVoted', contestId)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (localStorage.getItem('lastVoted') === contestId) {
      setDisableSubmit(true);
    }
    const localVotes = JSON.parse(localStorage.getItem('votes'));
    if (localVotes && localVotes[3] === contestId) {
      dispatch(addVote(0,localVotes[0]))
      dispatch(addVote(1,localVotes[1]))
      dispatch(addVote(2,localVotes[2]))
    } else {
      localStorage.removeItem('votes')
    }
  },[])

  useEffect(() => {
    let localVotes = JSON.stringify([...top3, contestId]);
    console.log(localStorage.getItem('votes'))
    localStorage.setItem('votes', localVotes)
  }, [top3]);

  const changeVoter = function(){
    setExcluded(undefined);
    localStorage.removeItem('excluded');
  }

  if (!disableSubmit) {
    return (
      <div className='submitvote'>
        <ListGroup >
    <ListGroup.Item variant='dark'><h4>
      {!!voter && (<><span onClick={changeVoter}>{voter.contestant}</span> - </>)}Place Your Vote:
    </h4></ListGroup.Item>
          <ListGroup.Item variant='dark' className="submit-list">
            1st place (3 points):
            <span style={{color: 'darkred'}}>{top3[0] ? ` Mix# ${top3[0]}` : ''}</span>
          </ListGroup.Item>
          <ListGroup.Item variant='dark' className="submit-list">
            2nd place (2 points):
            <span style={{color: 'darkred'}}>{top3[1] ? ` Mix# ${top3[1]}` : ''}</span>
          </ListGroup.Item>
          <ListGroup.Item variant='dark' className="submit-list">
            3rd place (1 point):
            <span style={{color: 'darkred'}}>{top3[2] ? ` Mix# ${top3[2]}` : ''}</span>
          </ListGroup.Item>
          <ListGroup.Item variant='dark' className='submit-list'>
            <span style={{color: 'blue'}} onClick={changeVoter}>CLICK HERE to reset who is voting.</span>
            {!voter && (
              <>
              <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email (required)" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </Form.Group>
              </Form>
              &nbsp;&nbsp;
              </>
            )}
            <Form inline>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" onClick={()=>setIncludeNotes(!includeNotes)}/>
                <Form.Label>Include your notes</Form.Label>
              </Form.Group>
              &nbsp;&nbsp;
            </Form>
            <div style={{margin:'0 0 0 auto'}}>
              <Button
                variant="primary" type="submit"
                disabled={top3.includes(null) || (voter === undefined ? !validateEmail(email) : false)}
                onClick={() => submitHandler(event)}>
                  Vote
              </Button>
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
        setExcluded(undefined);
        dispatch(clearVotes());
        dispatch(clearNotes());
        localStorage.removeItem('lastVoted');
        localStorage.removeItem('contestNotes')
        localStorage.removeItem('votes')
        localStorage.removeItem('excluded')} }>
        Give someone else a turn to vote
      </Button>
    </div>
  )


}

export default SubmitVote;