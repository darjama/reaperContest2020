import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, Button} from 'react-bootstrap';
import Hero from '../common/Hero';
import axios from 'axios';
import PointsGraph from  './PointsGraph';
import Comments from  './Comments';
import Playlist from '../Vote/Playlist';
import Player from '../Vote/Player';
import '../../css/results.css';

const Results = function() {
  const date = new Date()
  const [contestId, setContestId] = useState(0);
  const [details, setDetails] = useState({});
  const [resultData, setResultData] = useState([]);
  const [allEntriesData, setAllEntriesData] = useState([]);

  useEffect(() => {
    axios.get('/api/contests')
    .then(res => {
      const x = (res.data
      // .sort((a,b) => new Date(b.resultdate) - new Date(a.resultdate))
      .find(a => new Date(a.resultdate) < date))
      setDetails(x)
      return x
    }).then(res => {
      setContestId(res.contestid)
      return res.contestid})
  }, [])

  useEffect(() => {
    if (contestId > 0) {
      axios.get('/api/resultsdata/' + contestId)
      .then(data => setResultData(data.data))
      axios.get('/api/entries/' + contestId)
      .then(data => setAllEntriesData(data.data))
    }

  }, [contestId])

    const [pointsData, setPointsData] = useState([]);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    if (!resultData.length || !allEntriesData.length) return;
    const update = [...pointsData];
    const comments = [];
    allEntriesData.forEach((entry, i) => {
      update[entry.mixnum - 1] = {
        mixnum: entry.mixnum,
        contestant: entry.contestant,
        first: 0,
        second: 0,
        third: 0,
        total: 0,
      }

    })
    resultData.forEach((vote, idx) => {
      if(vote.first) {
        update[vote.first - 1].first ++;
        update[vote.first - 1].total += 3;
      }
      if(vote.second) {
        update[vote.second - 1].second ++;
        update[vote.second - 1].total += 2;
      }
      if(vote.third) {
        update[vote.third - 1].third ++;
        update[vote.third - 1].total ++;

      }
      if (vote.notes) {
        Object.entries(vote.notes).forEach(([key, comment]) => {
          comments.push({
            mixnum: key,
            comment: comment,
            commenter: 'Voter #' + (idx + 1),
          })
        })
      }

    })
    setPointsData(update);
    setAllComments(comments);

  },[resultData, allEntriesData])

  return (
    <div style={{color: 'white', display:'grid', placeItems: 'center'}}>
      <Hero name='Results'/>
      <h1>{details.contestlabel} Contest Results</h1>
      <h2>{details.songname} by {details.artist}</h2>
      <div style={{color: 'white', display:'grid', placeItems: 'center'}}>

        <div style={{width:'95%', display: 'flex', }}>

          <div style={{maxWidth:'600px', margin:'7px'}}>
            <Player/>
            <Playlist entries={allEntriesData} />
            <Button style={{margin: '10px'}} href={`https://flac.reamixed.com/${contestId}/${contestId}flacs.zip`} target="_blank" download>Download All Mixes</Button>
            <Button style={{margin: '10px'}} href={`https://flac.reamixed.com/${contestId}/${contestId}projects.zip`} target="_blank" download>Download All Project Files</Button>
            <Button style={{margin: '10px'}} href={details.rawuri} target="_blank" download>Download All Original Tracks</Button>
          </div>
          <div>
            <PointsGraph pointsData={pointsData} />
            <Comments allComments={allComments} allEntries={allEntriesData} />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Results;