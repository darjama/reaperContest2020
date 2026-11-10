import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

const rules = [
  'No additional samples, gluing, or destructive editing was done in the mix.',
  'I am uploading a zip-compressed file <= 105MB in size.',
  'The file contains my Reaper project .RPP file, any JSFX effects used that are not part of the Reaper installation or the current Tukan release, and any impulses used in REAFIR.',
  'The file contains a 24-bit FLAC file of my mix at the same sample rate as the media files that measures measures no more than -14 LUFS (integrated) and dBFS peaks at -1.0dB or less.',
  'The file DOES NOT contain the original media files.',
];
function PreModal(props) {

  const [showModal, setShowModal] = useState(true);
  const [checks, setChecks] =  useState(0);

  function handleClose() {
    if (checks === rules.length) setShowModal(false);
  }

  useEffect(() => {
    handleClose()
    console.log(checks)
  }, [checks])

  function changeHandler(event) {
    event.persist()
    setChecks(prior => prior + (event.target?.checked ? 1 : -1))
  }
    return (
      <Modal show={showModal} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Before you submit your mix...</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          Please make sure that you followed the rules:
          <div style={{ padding: '20px'}}>

          <Form>
            {rules.map((rule, index) => (
              <Form.Check
              key={'rule' + index}
              id={'rule' + index}
              style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                marginBottom: '.5rem',
                alignContent: 'center',
                display: 'grid',
                boxSizing: 'border-box',
              }}
              >
                <Form.Check.Input style={{ placeSelf: 'start', minHeight: '13px', minWidth: '13px', marginTop: '8px' }} onChange={changeHandler} />
                <Form.Check.Label style={{ maxWidth: '85%' }}>
                  {rule}
                </Form.Check.Label>
              </Form.Check>
            ))}
          </Form>
          </div>
          <br />
          <br />
          <Link to='/'>Return to homepage</Link>
        </Modal.Body>
      </Modal>
    );
  }

export default PreModal;
