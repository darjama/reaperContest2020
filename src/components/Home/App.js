import React from 'react';
import Carousel from './Carousel.js';
import Schedule from './Schedule';
import {connect} from 'react-redux';
import {fetchContestDetails} from '../../redux/contestDetails/contestDetailActions';
import {Card, CardDeck, Container} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchContestDetails();
  }

  render() {
    var months = ['January','February','March','April','May','June','July','August', 'September', 'October', 'November', 'December']

    let { month, year, songname, artist, artistimg, description, rawuri, startdate, duedate, votestart, voteend, resultdate, nextstart } = this.props.details;

    return(
      <Container>
        <p>Welcome to the Reaper Mix Contest Page. The perfect place to find new music to mix and to learn and share mixing techniques with others. The current contest is.</p>

        <p>Please join us over in the <a href='https://forums.cockos.com/forumdisplay.php?f=24' target="_blank">the Reaper Forums</a> for discussion about this month's contest and mixing in Reaper in general.</p>
        <CardDeck>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={artistimg} />
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
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Contest Schedule</Card.Title>
              <Card.Text>
                <Schedule details={this.props.details} date={new Date()}/>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>

      </Container>
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