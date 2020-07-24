import React from 'react';
import HeaderCarousel from './Carousel.js';
import Schedule from './Schedule';
import {connect} from 'react-redux';
import {fetchContestDetails} from '../../redux/contestDetails/contestDetailActions';
import {Card, CardDeck, Container} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.details) this.props.fetchContestDetails();
  }

  render() {
    var months = ['January','February','March','April','May','June','July','August', 'September', 'October', 'November', 'December']

    let { month, year, songname, artist, artistimg, description, rawuri, startdate, duedate, votestart, voteend, resultdate, nextstart } = this.props.details;

    return(
      <div>
      <HeaderCarousel/>
      <Container style={{ minWidth: '350px' }} fluid>
        <CardDeck style={{ margin: '10px 0 0 0' }} >
          <Card style={{ minWidth: '99%', margin: '5px 10px' }}>
          <Card.Body>
            <Card.Text>
            Welcome to the Reaper Mix Contest Page. The perfect place to find new music to mix and to learn and share mixing techniques with others. The current contest is.

            Please join us over in the <a href='https://forums.cockos.com/forumdisplay.php?f=24' target="_blank">the Reaper Forums</a> for discussion about this month's contest and mixing in Reaper in general.
            </Card.Text>
          </Card.Body>
          </Card>
          <Card style={{ minWidth: '300px', width: '50%%' }}>
            <Card.Img variant="top" src={artistimg}/>
            <Card.Body>
              <Card.Title>{months[month - 1]} {year}</Card.Title>
              <Card.Text>
                This month's song is "{songname}" by {artist}.
                <br/><br/>
                {description}
              </Card.Text>
              <Card.Link href={rawuri}>Download the Tracks</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ minWidth: '300px', width: '50%' }}>
            <Card.Body>
              <Card.Title>Contest Schedule</Card.Title>
              <Card.Text>
                <Schedule details={this.props.details} date={new Date()}/>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>

      </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    details: state.contestDetailReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchContestDetails: () => dispatch(fetchContestDetails()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)