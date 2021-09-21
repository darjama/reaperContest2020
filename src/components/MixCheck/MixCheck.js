import React, { useState, useEffect } from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import nativeVsts from './nativeVsts';
import nativeJsfx from './nativeJsfx';
import vstParser from './vstParser';
import axios from 'axios';

export default function MixCheck() {
  const [notAllowedFx, setNotAllowedFx] = useState([]);
  const [projectAudio, setProjectAudio] = useState([]);
  const [impulses, setImpulses] = useState([]);
  const [neededJSFX, setNeededJSFX] = useState([]);
  const [fileText, setFileText] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [contestFiles, setContestFiles] = useState([]);

  useEffect(() => {
    axios('/api/contests/current').then((contest) => {
      setContestFiles(contest.data.audiofiles);
    });
  }, []);

  useEffect(() => {
    // split tracks
    const tracks = fileText.split('<TRACK');
    setProjectDetails(tracks[0]);
    const tracksObj = {};
    const vsts = [];
    const jsfxList = new Set();
    const impulseList = new Set();

    tracks.forEach((track) => {
      // get VSTs
      const trackVsts = track.split('<VST ').map((vst) => vst.split('\n'));
      trackVsts.shift();
      vsts.push(trackVsts);
      // get JSFC
      track.split('<JS ').forEach((js, i) => {
        if (!i) return;
        const line = js.split('"');
        if (line[0]) {
          jsfxList.add(line[0].trim());
        } else {
          jsfxList.add(line[1]);
        }
      });
    });
    setNeededJSFX([...jsfxList]);

    const vstFiles = vstParser(vsts);
    const newNotAllowed = new Set();
    vstFiles.forEach((vst) => {
      if (!nativeVsts.includes(vst.file)) {
        newNotAllowed.add(vst);
      }
      vst.impulses.forEach((impulse) => impulseList.add(impulse));
    });
    setImpulses([...impulseList]);
    const waves = fileText.split('<SOURCE');
    waves.shift();
    const audioFiles = new Set();
    waves.forEach((a, i) => {
      const temp1 = a.split('\r\n')[1].trim().split('FILE ')[1];
      if (!temp1) {
        console.log('undefined temp', i, a);
        return;
      }
      return temp1.replaceAll('"', '').split('\\').pop();
    });
    setProjectAudio([...audioFiles].sort());
    setNotAllowedFx([...newNotAllowed].sort());
  }, [fileText]);

  function loadMix(e) {
    e.preventDefault();
    if (!e.target.files[0]) return;
    e.target.files[0].text().then((text) => {
      setFileText(text);
    });
  }

  const extraAudio = [];

  const notValid = !!fileText && !projectDetails.includes('<REAPER_PROJECT');
  const isValid = !!fileText && projectDetails.includes('<REAPER_PROJECT');
  const notLoaded = !fileText;

  const results = [
    {
      name: 'VSTs',
      none: 'No Non-native VSTs found.',
      some: 'The following VSTs need to be removed or replaced before submitting your project:',
      color: 'red',
      array: notAllowedFx,
      mapFunc: (fx, i) => (
        <tr key={fx.name + i}>
          <td>
            {fx.name} on track {fx.track}
          </td>
        </tr>
      ),
    },
    {
      name: 'JSFX',
      none: 'No Non-native JSFX found.',
      some: 'Please include the following JSFX with your submission:',
      color: 'yellow',
      array: neededJSFX.filter((a) => !nativeJsfx.includes(a)).sort(),
      mapFunc: (fx, i) => (
        <tr key={fx + i}>
          <td>{fx}</td>
        </tr>
      ),
    },
    {
      name: 'Audio Files',
      none: 'No Additional audio files found.',
      some: 'Please remove the following audio files before submitting your project:',
      color: 'red',
      array: projectAudio.filter((file) => !contestFiles.includes(file)),
      mapFunc: (file, i) => (
        <tr key={file + i}>
          <td>{file}</td>
        </tr>
      ),
    },
    {
      name: 'Impulses',
      none: 'No impulse files found.',
      some: 'Please include the following impulse files when submitting your project:',
      color: 'yellow',
      array: impulses.sort(),
      mapFunc: (file, i) => (
        <tr key={file + i}>
          <td>{file}</td>
        </tr>
      ),
    },
  ];
  return (
    <Container fluid style={{ color: 'white' }}>
      <br />
      <h1>Mix Check</h1>
      <br />
      <form>
        <input
          type='file'
          title='load your project file here.'
          accept='.rpp'
          onChange={loadMix}
        />
      </form>
      <br />
      {notValid && <h3>Not a valid Project File</h3>}

      {isValid && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {results.map((result) => (
            <Card
              key={result.name}
              style={{
                margin: '.25em',
                minWidth: '10em',
                width: result.array.length ? '20em' : '10em',
                flexGrow: 2,
                flexShrink: 2,
              }}
            >
              <Card.Header>{result.name}</Card.Header>
              <Card.Body>
                {!result.array.length && (
                  <div style={{ color: 'green' }}>{result.none}</div>
                )}
                {!!result.array.length && (
                  <Table
                    striped
                    hover
                    variant='dark'
                    size='sm'
                    style={{ wordBreak: 'break-all' }}
                  >
                    <thead>
                      <tr style={{ color: result.color }}>
                        <td>{result.some}</td>
                      </tr>
                    </thead>
                    <tbody>{result.array.map(result.mapFunc)}</tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
