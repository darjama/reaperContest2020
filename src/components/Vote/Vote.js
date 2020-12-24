import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../redux/notes/notesActions';
import {ListGroup, Container, Button} from 'react-bootstrap';
import NotNowModal from '../common/NotNow';
import ExcludeModal from './ExcludeModal';
import Hero from '../common/Hero';
import Player from './Player';
import VoteCard from './VoteCard';
import SubmitVote from './SubmitVote';
import Playlist from './Playlist';
import '../../css/vote.css';
import { withRouter} from 'react-router-dom'


function Vote(props) {

  const details = useSelector(state => state.contestDetailReducer);
  const entries = useSelector(state => state.entriesDetailReducer);
  const dispatch = useDispatch();

  const d = new Date();
  const month = '0' + (d.getMonth() + 1).toString();
  const contestId = Number(d.getFullYear().toString() + month.substring(month.length -2));

  const {votestart, voteend, resultdate, prefix, songname, markers} = details;
  const [top3, setTop3] = useState([null,null,null]);
  const [excluded, setExcluded] = useState(undefined);

  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem('contestNotes'));
    const localExcluded = JSON.parse(localStorage.getItem('excluded'));
    if (localNotes?.contestId === contestId) {
      dispatch(updateNote(localNotes))
    } else {
      localStorage.removeItem('contestNotes')
    }
    if (localExcluded?.contestId === contestId) {
      setExcluded(localExcluded.mixnum)
    } else {
      localStorage.removeItem('excluded')
    }
  },[])

  const entryList = entries.sort((a,b)=>a.mixnum - b.mixnum).map(entry => {

    return (
    <VoteCard key={entry._id} entry={entry} prefix={prefix} contestId={contestId} excluded={excluded === entry.mixnum}/>
  )})

  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const early = `Voting hasn't started yet. Come back on  ${new Date(votestart).toLocaleDateString('en-US', options)}.`
  const late = `Voting for this month is over. Check the homepage for results starting on ${new Date(resultdate).toLocaleDateString('en-US', options)}.`

   return (
    <Container fluid>
      <NotNowModal start={votestart} end={voteend} early={early} late={late}/>
      {excluded === undefined && (
        <ExcludeModal contestId={contestId} start={votestart} end={voteend} entries={entries} setExcluded={setExcluded}/>
      )}


      <div className="playerparent">
        <Player songName={songname} markers={markers}/>

        <SubmitVote voter={entries.filter(a=>a.mixnum === excluded)[0]} setExcluded={setExcluded}/>
      </div>

      <div className='voteplparent'>
        <div className='vcardcontainer'>{entryList}</div>
        <Playlist entries={entries} prefix={prefix} random={true}/>
      </div>
        <Button style={{margin: '10px'}} href={`http://flac.reamixed.com/${contestId}/${contestId}flacs.zip`} target="_blank" download>Download All Mixes from this Month</Button>
    </Container>
  );
}
export default withRouter(Vote);