import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../redux/notes/notesActions';
import { ListGroup, Container, Button, Col, Row } from 'react-bootstrap';
import loadable from '@loadable/component';
import NotNowModal from '../common/NotNow';
const ExcludeModal = loadable(() => import('./ExcludeModal'));
import Hero from '../common/Hero';
const Player = loadable(() => import('../common/Player'));
const VoteCard = loadable(() => import('./VoteCard'));
const SubmitVote = loadable(() => import('./SubmitVote'));
import Playlist from '../common/Playlist';
import '../../css/vote.css';
import { withRouter } from 'react-router-dom';

function Vote(props) {
  const details = useSelector((state) => state.contestDetailReducer);
  const entries = useSelector((state) => state.entriesDetailReducer);
  const dispatch = useDispatch();

  const d = new Date();
  const month = '0' + (d.getMonth() + 1).toString();
  const contestId = Number(
    d.getFullYear().toString() + month.substring(month.length - 2)
  );

  const { votestart, voteend, resultdate, prefix, songname, markers } = details;
  const [top3, setTop3] = useState([null, null, null]);
  const [excluded, setExcluded] = useState(undefined);

  console.log('excluded', excluded);
  useEffect(() => {
    document.title = 'reaMIXed: Vote';
    const localNotes = JSON.parse(localStorage.getItem('contestNotes'));
    const localExcluded = JSON.parse(localStorage.getItem('excluded'));
    if (localNotes?.contestId === contestId) {
      dispatch(updateNote(localNotes));
    } else {
      localStorage.removeItem('contestNotes');
    }
    if (localExcluded?.contestId === contestId) {
      setExcluded(localExcluded.mixnum);
    } else {
      localStorage.removeItem('excluded');
    }
  }, []);

  const entryList = entries
    .sort((a, b) => a.mixnum - b.mixnum)
    .map((entry) => {
      return (
        <VoteCard
          key={entry._id}
          entry={entry}
          prefix={prefix}
          contestId={contestId}
          excluded={excluded === entry.mixnum}
        />
      );
    });

  const test = true;

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const early = `Voting hasn't started yet. Come back on  ${new Date(
    votestart
  ).toLocaleDateString('en-US', options)}.`;
  const late = `Voting for this month is over. Check the homepage for results starting on ${new Date(
    resultdate
  ).toLocaleDateString('en-US', options)}.`;

  return (
    <Container fluid>
      {/* <NotNowModal start={votestart} end={voteend} early={early} late={late} /> */}
      {excluded === undefined && (
        <ExcludeModal
          contestId={contestId}
          start={votestart}
          end={voteend}
          entries={entries}
          setExcluded={setExcluded}
        />
      )}
      <Row>
        <Col xs={7} lg={5}>
          <div className='playerparent'>
            <Player songName={songname} markers={markers} />
            <Playlist entries={entries} prefix={prefix} random={true} />
          </div>
        </Col>
        <Col>
          <SubmitVote
            voter={entries.filter((a) => a.mixnum === excluded)[0]}
            setExcluded={setExcluded}
            entriesCount={entries.length}
          />
          <div className='voteplparent'>
            <div className='vcardcontainer'>{entryList}</div>
          </div>
          <Button
            style={{ margin: '10px' }}
            href={`http://flac.reamixed.com/${contestId}/${contestId}flacs.zip`}
            target='_blank'
            download
          >
            Download All Mixes from this Month
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default withRouter(Vote);
