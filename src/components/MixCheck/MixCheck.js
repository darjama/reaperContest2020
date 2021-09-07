import React, { useState, useEffect } from 'react';
import { Card, CardGroup, Table, Container } from 'react-bootstrap';
import nativeVsts from './nativeVsts';
import nativeJsfx from './nativeJsfx';
import vstParser from './vstParser';

export default function MixCheck() {
  const [notAllowedFx, setNotAllowedFx] = useState([]);
  const [notAllowedFiles, setNotAllowedFiles] = useState([]);
  const [impulses, setImpulses] = useState(new Set());
  const [neededJSFX, setNeededJSFX] = useState([]);
  const [fileText, setFileText] = useState('');
  const [projectDetails, setProjectDetails] = useState('');

  useEffect(() => {
    const tracks = fileText.split('<TRACK');
    setProjectDetails(tracks.shift());
    const tracksObj = {};
    const vsts = [];
    const jsfxList = [];

    tracks.forEach((track) => {
      // get VSTs
      const trackVsts = track.split('<VST ').map((vst) => vst.split('\n'));
      trackVsts.shift();
      vsts.push(trackVsts);
      // get JSFC
      const trackJsfx = track.split('<JS ').map((js) => {
        const line = js.split('"');
        if (line[0]) return line[0].trim();
        return line[1];
      });
      trackJsfx.shift();
      jsfxList.push(jsfxList);
    });
    const vstFiles = vstParser(vsts);
    const newNotAllowed = new Set(notAllowedFx);
    vstFiles.forEach((vst) => {
      if (!nativeVsts.includes(vst.file)) {
        newNotAllowed.add(vst);
      }
      if (vst.impulses.length) {
        setImpulses(new Set([...impulses, ...vst.impulses]));
      }
    });
    const waves = fileText.split('<SOURCE');
    waves.shift();
    console.log(waves);
    console.log(
      new Set(
        waves.map((a) =>
          a
            .split('\r\n')[1]
            .trim()
            .split('FILE ')[1]
            .replaceAll('"', '')
            .split('\\')
            .pop()
        )
      )
    );

    setNotAllowedFx([...newNotAllowed]);
    const js = tracks.map((track) => track.split('<JS '));
  }, [fileText]);

  function loadMix(e) {
    e.preventDefault();
    // split into tracks
    // confirm it's an rpp file
    // check for extra audio files
    // check for notAllowedFx
    // check for needed jsfx files
    // check for needed impulses
    if (!e.target.files[0]) return;
    e.target.files[0].text().then((text) => {
      setFileText(text);
    });
  }

  const nonNativeJSFX = [];
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
      array: nonNativeJSFX,
      mapFunc: (fx, i) => (
        <tr key={fx.name + i}>
          <td>
            {fx.name} on track {fx.track}
          </td>
        </tr>
      ),
    },
    {
      name: 'Audio Files',
      none: 'No Additional audio files found.',
      some: 'Please remove the following audio files before submitting your project:',
      color: 'red',
      array: extraAudio,
      mapFunc: (file, i) => (
        <tr key={file.name + i}>
          <td>
            {file.name} on track {file.track}
          </td>
        </tr>
      ),
    },
    {
      name: 'Impulses',
      none: 'No impulse files found.',
      some: 'Please include the following impulse files when submitting your project:',
      color: 'yellow',
      array: [...impulses],
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
                  <Table striped hover variant='dark'>
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
