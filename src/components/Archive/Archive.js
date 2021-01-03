import React, { useState, useEffect } from 'react';
import Hero from '../common/Hero';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Results from '../Results/Results';

var Archive = function (props) {
  const [contestList, setContestList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [archiveContest, setArchiveContest] = useState();
  const history = useHistory();
  console.log(props);

  const updateAC = function (id) {
    if (id === '0') return;
    setArchiveContest(id);
    history.push('/archive?id=' + id);
  };

  console.log(archiveContest);
  useEffect(() => {
    let params = Number(new URL(document.location).searchParams.get('id'));
    axios
      .get('/api/contestnames/')
      .then((data) => {
        setContestList(data.data);
        if (
          data.data.some(
            (a) => a.contestid === params && new Date(a.resultdate) < new Date()
          )
        ) {
          setArchiveContest(params);
        }
      })
      .catch((err) => console.log(err));
  }, [props.location.search]);

  return (
    <div style={{ textAlign: 'center' }}>
      <Hero name='Contest Archives' />

      <table style={{ color: 'white', margin: '5px', width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ width: '45%' }}>
              <Form>
                <Form.Group controlId='archiveContestSelect'>
                  <Form.Control
                    as='select'
                    defaultValue={0}
                    onChange={(e) => updateAC(e.target.value)}
                  >
                    <option value={0}>select a contest</option>
                    {contestList.map((contest) => (
                      <option
                        key={contest._id}
                        value={contest.contestid}
                        disabled={new Date(contest.resultdate) > new Date()}
                      >
                        {contest.contestlabel}: {contest.songname} by{' '}
                        {contest.artist}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </td>
            <td style={{ width: '10%' }} />
            <td style={{ width: '45%' }}>
              For the contests before 2020, please visit the{' '}
              <a
                href='https://reapercontest.wixsite.com/home/archive'
                target='_blank'
              >
                Original Reaper Contest Archive
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      {archiveContest && <Results contestid={archiveContest} />}
    </div>
  );
};

export default Archive;
