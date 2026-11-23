import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

class NotNowModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // props.now comes from the store and only changes when the date or
    // contest phase changes, so the gate re-evaluates while the app is open
    let date = new Date(this.props.now);
    let start = new Date(this.props.start);
    let end = new Date(this.props.end);
    let shp = new URL(document.location).searchParams.get('sh');
    const validStart = !isNaN(start) && start instanceof Date;
    console.log('NotNowModal', date, start, end, shp);
    return (
      <Modal
        show={(!validStart || date < start || date > end) && shp !== 'test093'}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Sorry!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(!validStart || date < start) ? this.props.early : ''}
          {date > end ? this.props.late : ''}
          <br />
          <br />
          <Link to={'/' + document.location.search}>Return to homepage</Link>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    now: state.nowReducer,
  };
};

export default connect(mapStateToProps)(NotNowModal);
