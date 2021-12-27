import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Spinner } from 'react-bootstrap';
import Hero from '../common/Hero';
import axios from 'axios';
import Top3PointsGraph from './Top3PointsGraph';
import FiveStarPointsGraph from './FiveStarPointsGraph';
import Comments from './Comments';
import Playlist from '../common/Playlist';
import Player from '../common/Player';
import '../../css/results.css';

const Results = function (props) {
  const [details, setDetails] = useState();
  const [resultData, setResultData] = useState([]);
  const [allEntriesData, setAllEntriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'reaMIXed: Results';
    if (props.contestid) return;
    axios
      .get('/api/resultscontest')
      .then((res) => {
        setDetails(res.data);
        return res.data.contestid;
      })
      .then((contestId) => {
        axios
          .get('/api/resultsdata/' + contestId)
          .then((data) => setResultData(data.data))
          .catch((err) => {
            console.log(err);
          });
        axios
          .get('/api/entries/' + contestId)
          .then((data) => setAllEntriesData(data.data))
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!props.contestid) return;
    setIsLoading(true);
    setDetails();
    setResultData([]);
    setAllEntriesData([]);
    axios
      .get(
        `/api/contests/${props.contestid
          .toString()
          .substring(4)}/${props.contestid.toString().substring(0, 4)}`
      )
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get('/api/resultsdata/' + props.contestid)
      .then((data) => setResultData(data.data))
      .catch((err) => {
        console.log(err);
      });
    axios
      .get('/api/entries/' + props.contestid)
      .then((data) => setAllEntriesData(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, [props.contestid]);

  useEffect(() => {
    if (allEntriesData.length > 0 && details && resultData.length)
      setIsLoading(false);
  }, [allEntriesData, details, resultData]);

  const [pointsData, setPointsData] = useState([]);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    if (!resultData.length || !allEntriesData.length) return;
    const update = [];
    const comments = [];
    allEntriesData.forEach((entry, i) => {
      update[entry.mixnum - 1] = {
        mixnum: entry.mixnum,
        contestant: entry.contestant,
        dynamicRange:
          entry?.dynamicRange?.$numberDecimal || entry?.dynamicRange,
        trackCount: entry?.trackCount,
        first: 0,
        second: 0,
        third: 0,
        total: 0,
        ratings: [],
        min: Infinity,
        max: -Infinity,
      };
    });
    resultData.forEach((vote, idx) => {
      if (vote?.first) {
        update[vote.first - 1].first++;
        update[vote.first - 1].total += 3;
      }
      if (vote?.second) {
        update[vote.second - 1].second++;
        update[vote.second - 1].total += 2;
      }
      if (vote?.third) {
        update[vote.third - 1].third++;
        update[vote.third - 1].total++;
      }
      if (vote?.ratings) {
        Object.entries(vote.ratings).forEach(([key, rating]) => {
          let index = Number(key) - 1;
          if (key === 'contestId') {
            return;
          }
          update[index].ratings.push(rating);
          update[index].min = Math.min(update[index].min, rating);
          update[index].max = Math.max(update[index].max, rating);
        });
      }
      if (vote?.notes) {
        Object.entries(vote.notes).forEach(([key, comment]) => {
          comments.push({
            mixnum: key,
            comment: comment,
            commenter: 'Voter #' + (idx + 1),
          });
        });
      }
    });
    if (update[0]?.ratings?.length) {
      update.forEach((row, i) => {
        row.avg = (
          row.ratings.reduce((a, b) => a + b, 0) / row.ratings.length
        ).toFixed(2);
      });
    }
    setPointsData(update);
    setAllComments(comments);
  }, [resultData, allEntriesData]);

  if (isLoading) {
    return <Spinner size='lg' animation='border' variant='light' />;
  }

  return (
    <div style={{ color: 'white', display: 'grid', placeItems: 'center' }}>
      {!props.contestid && (
        <>
          <Hero name='Results' />
          <h3>{details.contestlabel} Contest Results</h3>
        </>
      )}
      {props.contestid && <h3>{details.contestlabel} Contest Results</h3>}

      <h2>
        {details.songname} by {details.artist}
      </h2>
      <div style={{ color: 'white', display: 'grid', placeItems: 'center' }}>
        <div
          style={{ width: '100%', display: 'flex', flexWrap: 'wrap-reverse' }}
        >
          <div style={{ flex: '1 2 450px', margin: '7px' }}>
            <Player songName={details.songname} markers={details.markers} />
            <Playlist entries={allEntriesData} prefix={details.prefix} />
            <Button
              style={{ margin: '10px' }}
              href={`https://flac.reamixed.com/${details.contestid}/${details.contestid}flacs.zip`}
              download
            >
              Download All Mixes
            </Button>
            <Button
              style={{ margin: '10px' }}
              href={`https://flac.reamixed.com/${details.contestid}/${details.contestid}projects.zip`}
              download
            >
              Download All Project Files
            </Button>
            <Button
              style={{ margin: '10px' }}
              href={details.rawuri}
              target={details.rawuri.slice(-4) === '.zip' ? '_self' : '_blank'}
              download
            >
              Download Original Tracks
            </Button>
          </div>
          <div style={{ flex: '2 1 50%', margin: '7px' }}>
            {!!resultData[0]?.first && (
              <Top3PointsGraph
                pointsData={pointsData}
                isArchive={!!props.contestid}
              />
            )}
            {!!pointsData[0]?.ratings.length && (
              <FiveStarPointsGraph
                pointsData={pointsData}
                isArchive={!!props.contestid}
              />
            )}
            <Comments allComments={allComments} allEntries={allEntriesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
