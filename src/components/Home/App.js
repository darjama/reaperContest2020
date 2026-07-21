import * as React from 'react';
import HeaderCarousel from './Carousel.js';
import Schedule from './Schedule.js';
import { connect } from 'react-redux';
import { fetchContestDetails } from '../../redux/contestDetails/contestDetailActions.js';
import { Card, CardDeck, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DownloadModal from './DownloadModal.js';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadModal: false
    }
    this.toggleDownloadModal = this.toggleDownloadModal.bind(this)
  }

  componentDidMount() {
    document.title = 'reaMIXed: The (Unauthorized) Reaper Mix Contest';
  }

  toggleDownloadModal() {
    this.setState((prevState) => ({
      showDownloadModal: !prevState.showDownloadModal
    }));
  }

  render() {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let {
      month,
      year,
      songname,
      artist,
      artistimg,
      description,
      rawuri,
      startdate,
      duedate,
      votestart,
      voteend,
      resultdate,
      nextstart,
    } = this.props.details;

    return (
      <div>
        <DownloadModal open={this.state.showDownloadModal} toggle={this.toggleDownloadModal} url={rawuri} />
        <HeaderCarousel />
        <Container style={{ minWidth: '350px' }} fluid>
          <CardDeck style={{ margin: '10px 0 0 0', gap: '10px' }}>
            <Card style={{ minWidth: '30rem' }}>
              <Card.Body>
                <Card.Title className='text-center rem2 cuprum'>
                  reaMIXed
                </Card.Title>
                <Card.Text>
                  ... is the (unauthorized) Reaper Mix Contest Page. The perfect
                  place to find new music to mix and to learn and share mixing
                  techniques with others. If you're new to the contest or to
                  Reaper I'd suggest you visit the{' '}
                  <Link to='/getstarted'>Getting Started</Link> page to find
                  some helpful resources.
                  <br />
                  <br />
                  Please join us over in the{' '}
                  <a
                    href='https://forums.cockos.com/forumdisplay.php?f=24'
                    target='_blank'
                  >
                    the Reaper Forums
                  </a>{' '}
                  for discussion about this month's contest and mixing in Reaper
                  in general.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ minWidth: '30rem' }} id='download'>
              <Card.Body>
                <Card.Title className='text-center rem2 cuprum'>
                  {months[month - 1]} {year}
                </Card.Title>
                <Card.Text>
                  This month's song is "{songname}" by {artist}.
                  <br />
                  <br />
                  {description}
                </Card.Text>
                <div
                  style={{
                    display: 'grid',
                    width: '100%',
                    placeContent: 'center',
                  }}
                >
                  <Button
                    type='button'
                    onClick={this.toggleDownloadModal}
                    style={{ fontSize: '1.2rem' }}
                  >
                    Get the Tracks
                  </Button>
                </div>

                <br />
                <Card.Img variant='bottom' src={artistimg} />
              </Card.Body>
            </Card>
            <Card style={{ minWidth: '30rem' }}>
              <Card.Body>
                <Card.Title className='text-center rem2 cuprum'>
                  Contest Schedule
                </Card.Title>
                <Schedule details={this.props.details} date={new Date()} />
              </Card.Body>
            </Card>
          </CardDeck>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.contestDetailReducer,
  };
};

export default connect(mapStateToProps)(App);
