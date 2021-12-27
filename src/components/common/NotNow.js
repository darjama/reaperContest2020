import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

class NotNowModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = new Date();
    let start = new Date(this.props.start);
    let end = new Date(this.props.end);
    let shp = new URL(document.location).searchParams.get('sh');
    return (
      <Modal
        show={(date < start || date > end) && shp !== 'test093'}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Sorry!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {date < start ? this.props.early : ''}
          {date > end ? this.props.late : ''}
          <br />
          <br />
          <Link to='/'>Return to homepage</Link>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NotNowModal;
