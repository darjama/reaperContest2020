import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../redux/notes/notesActions';
import { playLink, addTrack, rerenderNow } from '../../redux/playlist/playlistActions';
import { addVote } from '../../redux/voting/voteActions';
import {Card, Form, Button} from 'react-bootstrap'
import { RiPlayFill, RiPlayListAddLine } from 'react-icons/ri';

var VoteCard = function({entry, contestId, prefix, excluded}) {

  const dispatch = useDispatch();
  const notes = useSelector(state => state.noteReducer);
  const nowPlaying = useSelector(state => state.playNowReducer);
  const top3 = useSelector(state => state.voteReducer);
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

  const voteHandler = function(e) {
    dispatch(addVote(e.target.value, entry.mixnum))
  }

  // const nextObj = { //for testing purposes
  //   next: null,
  //   prev: playObj,
  //   uri: 'http://flac.reamixed.com/202008/04.flac',
  //   name: 'Mix #4'
  // }

  const playObj = {
    next: null,
    prev: null,
    uri: 'http://flac.reamixed.com/' + contestId + '/' + prefix + ('0' + entry.mixnum).slice(-2)+'.flac',
    mixnum: entry.mixnum,
    name: 'Mix #' + entry.mixnum,
    normalize: entry.normalize || 0
  }

  const  classnames = 'votecard' + (nowPlaying.mixnum === entry.mixnum ? ' nowPlaying' : '');
  return (
    <Card className={classnames}>
      <Card.Title as="div" className="flex-row-spaced"><div>Mix # {entry.mixnum}</div>
      <div>
      <Button style={{margin: '0 5px 0 20px'}} title="Add to Playlist" alt="Add to Playlist" variant="secondary" onClick={() => {dispatch(addTrack(entry)); dispatch(rerenderNow())}}><RiPlayListAddLine/></Button>
        <Button style={{margin: '0 5px 0 20px'}} title="Play Now" alt="Play Now" variant="secondary" onClick={() => dispatch(playLink(playObj))}><RiPlayFill /></Button>
      </div>

      </Card.Title>
      <Card.Body>
        <Form>
          <Form.Group controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea"  autoComplete="off" value={note} rows="4" onChange={() => changeHandler(event)}>
            </Form.Control>
          </Form.Group>

        <div key={`inline-radio`} className="mb-3">
        Vote :&nbsp;
          <Form.Check inline label="1st" type='radio' checked={top3[0] === entry.mixnum} disabled={excluded} name='vote' value='0' onChange={() => voteHandler(event)} />
          <Form.Check inline label="2nd" type='radio' checked={top3[1] === entry.mixnum} disabled={excluded} name='vote' value='1' onChange={() => voteHandler(event)}/>
          <Form.Check inline label="3rd" type='radio'  checked={top3[2] === entry.mixnum} disabled={excluded} name='vote' value='2' onChange={() => voteHandler(event)}/>
          <Form.Check inline label="none" type='radio'  checked={!top3.includes(entry.mixnum)} disabled={excluded} name='vote' value='999' onChange={() => voteHandler(event)} />
        </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default VoteCard;