import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../../dist/assets/reaperlogo.jpg';
import Hero from '../common/Hero';

var GetStarted = function (props) {
  React.useEffect(() => {
    document.title = 'reaMIXed: Getting Started';
  }, []);

  return (
    <React.Fragment>
      <Hero name='Getting Started' />
      <Container>
        <Row>
          <Col lg={10} />
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Card.Title className='text-center rem2 cuprum'>
                  About Reaper
                </Card.Title>
                <img
                  src={Logo}
                  alt='Reaper Logo'
                  style={{
                    float: 'right',
                    width: '15rem',
                    padding: '0 0 0 15px',
                  }}
                />
                <p>
                  Reaper is an incredibly flexible, free-to-try Digital Audio
                  Workstation (DAW) that is cross platform (Windows, MacOS,
                  Linux) and includes a great number of effects and can be
                  extended in a number of ways.
                </p>
                <p>
                  A useful Reaper extension is known as SWS. It expands reapers
                  functionality in a number of ways, but one that is important
                  for the contest is the ability to measure loudness using LUFS.
                </p>
              </Card.Body>
              <Card.Footer
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <Card.Link href='https://reaper.fm'>Download Reaper</Card.Link>
                <Card.Link href='https://sws-extension.org'>
                  Download SWS extension
                </Card.Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Card.Title className='text-center rem2 cuprum'>
                  Contest Rules
                </Card.Title>
                <ol>
                  <li>Don't use third party (non-JSFX) effects.</li>
                  <p>
                    In order that we may all learn from each other's projects,
                    only native Reaper and JSFX effects allowed. You may use a
                    metering plugin to measure LUFS (like{' '}
                    <a href='https://youlean.co/youlean-loudness-meter/'>
                      Youlean
                    </a>
                    ) since this won't affect the output. Using (public domian)
                    3rd party impulse responses in ReaVerb is permitted,
                    provided you include them with your submitted files.
                  </p>
                  <li>
                    The loudness measurement of the project should not exceed
                    -14 LUFS (integrated), and the peak should not exceed -1
                    dBFS.
                  </li>
                  <p>
                    You can use SWS or Youlean to measure LUFS for your file.
                    Comparing projects will be fairer and easier if loudness is
                    similar.
                  </p>
                  <li>
                    No destructive editing to the files. No samples or glueing.
                  </li>
                  <p>
                    Again, doing so limits the ability to share and learn from
                    each other's projects.
                  </p>
                  <li>
                    Submit your mixes as 24-bit FLAC files in the sample rate of
                    the source files.
                  </li>
                </ol>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2} />
        </Row>
        <br />
        <Row>
          <Col sm={2} />
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Card.Title className='text-center rem2 cuprum'>
                  How to Participate
                </Card.Title>
                <ol>
                  <li>
                    <a href='/#download'>Download</a> the multitrack session
                  </li>
                  <li>
                    <a href='/Submit'>Submit</a> your REAPER project (.rpp), any
                    reverb impulses you've used, any custom JSFX, a master mix,
                    a note containing your Reaper Forum username.
                  </li>
                  <li>
                    <strong style={{ textDecoration: 'underline' }}>
                      DON'T
                    </strong>{' '}
                    include the original media files in your upload.
                  </li>
                  <li>Listen to the submissions.</li>
                  <li>
                    Rate all the mixes (aside from your own) and leave mix
                    notes.
                  </li>
                  <li>
                    See who won, and check out the other participants project.
                  </li>
                  <li>
                    The winner gets to help choose a project for the next
                    month's contest. And the glory. But that's about it.
                  </li>
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default GetStarted;
