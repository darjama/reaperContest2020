import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Modal } from 'react-bootstrap';

var ContactForm = function (props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [oops, setOops] = useState(false);
  const [sending, setSending] = useState(false);

  function validateEmail(testString) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(testString).toLowerCase());
  }

  let isValid = validateEmail(email);
  let invalidEmail = isValid ? (
    ''
  ) : (
    <Form.Text style={{ color: 'red' }}>
      A valid email is required to submit this form.
    </Form.Text>
  );

  function sendMessage(e) {
    e.preventDefault();
    setSending(true);
    axios
      .post('/api/contactform', { email, message })
      .then((result) => {
        setEmail('');
        setMessage('');
        setSending(false);
        setConfirmation(true);
      })
      .catch((err) => {
        setSending(false);
        setOops(true);
      });
  }

  function closeModal() {
    if (sending) return;
    setConfirmation(false);
    setOops(false);
  }

  const modalOpen = sending || confirmation || oops;

  let modalTitle = 'Sending...';
  let modalBody = 'Please wait while we send your message.';
  if (confirmation) {
    modalTitle = 'Success!';
    modalBody = "Thank you, message sent! We'll respond to you post haste.";
  } else if (oops) {
    modalTitle = 'Oops!';
    modalBody =
      'There was an error in sending your message, please try again later.';
  }

  return (
    <React.Fragment>
      <Modal
        show={modalOpen}
        onHide={closeModal}
        centered
        backdrop={sending ? 'static' : true}
        keyboard={!sending}
      >
        <Modal.Header closeButton={!sending}>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        {!sending && (
          <Modal.Footer>
            <Button variant='primary' onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        )}
      </Modal>
      <Form onSubmit={sendMessage}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {invalidEmail}
        </Form.Group>
        <Form.Group controlId='formBasicTextArea'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            rows='3'
            as='textarea'
            autoComplete='off'
            placeholder='Enter your message here.'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit' disabled={!isValid}>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default ContactForm;
