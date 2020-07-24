import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class NotNowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
    }
  }

  render() {
    let date = new Date();
    let votestart = new Date(this.props.votestart);
    let voteend = new Date(this.props.voteend);
    let resultdate = new Date(this.props.resultdate);
    console.log(votestart, voteend, resultdate);
    const early = `Voting hasn't started yet. Come back on  ${votestart}.`
    const late = `Voting for this month is over. Check the homepage for results on ${resultdate}.`
    return(
        <Modal
          show={date < votestart || date > voteend }
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sorry!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {date < votestart ? early : ''}
            {date > voteend ? late : ''}
            <br/>
            <a href='/'>Return to homepage</a>
          </Modal.Body>

        </Modal>
    )
  }
}

export default NotNowModal;