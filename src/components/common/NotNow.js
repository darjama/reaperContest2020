import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class NotNowModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = new Date();
    let start = new Date(this.props.start);
    let end = new Date(this.props.end);
    return(
        <Modal
          show={date < start || date > end }
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sorry!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {date < start ? this.props.early : ''}
            {date > end ? this.props.late : ''}
            <br/><br/>
            <a href='/'>Return to homepage</a>
          </Modal.Body>

        </Modal>
    )
  }
}

export default NotNowModal;