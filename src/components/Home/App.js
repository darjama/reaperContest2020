import React from 'react';
import HeaderCarousel from './Carousel.js';
import Schedule from './Schedule';
import {connect} from 'react-redux';
import {fetchContestDetails} from '../../redux/contestDetails/contestDetailActions';
import {Card, CardDeck, Container} from 'react-bootstrap';
import axios from 'axios';

class App extends React.Pure Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.details) this.props.fetchContestDetails();
  }

  logHandler() {
    axios({url:'/api/dlLog' , method:'post'})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
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
            reaMIXed is the (unauthorized) Reaper Mix Contest Page. The perfect place to find new music to mix and to learn and share mixing techniques with others. If you're new to the contest or to Reaper I'd suggest you visit the <a href='/Start'>Getting Started</a> page to find some helpful resources.<br/><br/>
            Please join us over in the <a href='https://forums.cockos.com/forumdisplay.php?f=24' target="_blank">the Reaper Forums</a> for discussion about this month's contest and mixing in Reaper in general.
            </Card.Text>
          </Card.Body>
          </Card>
          <Card style={{ minWidth: '18rem' }} id="download">
            <Card.Body>
              <Card.Title className="text-center rem2 cuprum">{months[month - 1]} {year}</Card.Title>
              <Card.Text>
                This month's song is "{songname}" by {artist}.
                <br/><br/>
                {description}
              </Card.Text>
              <Card.Link href={rawuri} onClick={() => this.logHandler()}>Download the Tracks</Card.Link>
              <Card.Img variant="bottom" src={artistimg}/>
            </Card.Body>
          </Card>
          <Card style={{ minWidth: '18rem'}}>
            <Card.Body>
              <Card.Title className="text-center rem2 cuprum">Contest Schedule</Card.Title>
                <Schedule details={this.props.details} date={new Date()}/>
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