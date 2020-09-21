import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../redux/notes/notesActions';
import {ListGroup, Container, Button} from 'react-bootstrap';
import NotNowModal from '../common/NotNow';
import Hero from '../common/Hero';
import Player from './Player';
import VoteCard from './VoteCard';
import SubmitVote from './SubmitVote';
import Playlist from './Playlist';
import '../../css/vote.css';


function Vote(props) {

  const details = useSelector(state => state.contestDetailReducer);
  const entries = useSelector(state => state.entriesDetailReducer);
  const dispatch = useDispatch();

  const d = new Date();
  const month = '0' + (d.getMonth() + 1).toString();
  const contestId = Number(d.getFullYear().toString() + month.substring(month.length -2));

  const {votestart, voteend, resultdate} = details;
  const [top3, setTop3] = useState([null,null,null]);

  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem('contestNotes'));
    if (localNotes && localNotes.contestId === contestId) {
      dispatch(updateNote(localNotes))
    } else {
      localStorage.removeItem('contestNotes')
    }
  },[])


  const entryList = entries.map(entry => (
    <VoteCard key={entry._id} entry={entry} contestId={contestId}/>
  ))

  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const early = `Voting hasn't started yet. Come back on  ${new Date(votestart).toLocaleDateString('en-US', options)}.`
  const late = `Voting for this month is over. Check the homepage for results starting on ${new Date(resultdate).toLocaleDateString('en-US', options)}.`

   return (
    <div>
      <NotNowModal start={votestart} end={voteend} early={early} late={late}/>
      <div className="playerparent">
        <Player />
        <SubmitVote />
      </div>

      <div className='voteplparent'>
        <div className='vcardcontainer'>{entryList}</div>
        <Playlist entries={entries} />
      </div>
        <Button style={{margin: '10px'}} href={`http://flac.reamixed.com/${contestId}/${contestId}flacs.zip`} target="_blank" download>Download All Mixes from this Month</Button>
    </div>
  );
}
export default Vote;