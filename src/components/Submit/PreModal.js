import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

class PreModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      checks: 0,
      rules: [
        'I am uploading a zip-compressed file <= 85MB in size.',
        'The file contains my Reaper project .RPP file.',
        'The file contains a 24-bit FLAC file of my mix at the same sample rate as the media files.',
        'The mix measures no more than -14 LUFS (integrated) and dBFS peaks at -1.0dB or less',
        'The file DOES NOT contain the original media files.',
        'The file contains a JSFX directory with any JSFX effects used that are not part of the Reaper installation or the current Tukan release.',
        'The file contains an IMPULSE directory with any impulses used in REAFIR.',
        'No additional samples, gluing, or destructive editing was done in the mix.',
        'I will not vote for my own mix.',
      ],
    };
  }

  handleClose() {
    if (this.state.checks === this.state.rules.length)
      this.setState({ showModal: false });
  }

  changeHandler(event) {
    let newChecks = this.state.checks + (event.srcElement.checked ? 1 : -1);
    this.setState({ checks: newChecks }, () => this.handleClose());
  }

  render() {
    return (
      <Modal show={this.state.showModal} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Before you submit your mix...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please make sure that you followed the rules:
          <Form>
            {this.state.rules.map((rule, index) => (
              <Form.Check
                key={'rule' + index}
                id={'rule' + index}
                label={rule}
                onChange={() => this.changeHandler(event)}
              />
            ))}
          </Form>
          <br />
          <br />
          <Link to='/'>Return to homepage</Link>
        </Modal.Body>
      </Modal>
    );
  }
}

export default PreModal;
