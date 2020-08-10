import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Container, Form, Button, Toast} from 'react-bootstrap';

var ContactForm = function(props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [oops, setOops] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const submitButton = useRef(null);


  function validateEmail(testString) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(testString).toLowerCase());
  }

  let isValid  = validateEmail(email);
  let invalidEmail = isValid ? '' : <Form.Text style={{color: 'red'}}>
  A valid email is required to submit this form.
</Form.Text>

  let isFormVisible = showForm ? '' : 'hide-form';

  function sendMessage(e) {
    e.preventDefault();
    setSending(true);
    axios.post('/api/contactform', {email, message})
      .then(result => {
        setEmail('');
        setMessage('');
        setSending(false);
        setConfirmation(true);
        setShowForm(false);
      })
      .catch(err => {
        setSending(false);
        setOops(true);
      })
  }

  function clickContact(){
    setShowForm(!showForm);
  }

  React.useEffect(() => {
    if (showForm) submitButton.current.scrollIntoView({behavior: 'smooth', block: "start"}), []
  },[showForm])

  return (
    <Container>
      <div style={{width: '100%', textAlign: 'right'}}>
        <h2 style={{textAlign: 'right'}} onClick={() => clickContact()} style={{cursor: 'pointer'}}>Contact Us</h2>
      </div>
      <Toast show={sending} onClose={() => setSending(false)}>
          <Toast.Header>
            <strong >Sending...</strong>
          </Toast.Header>
      </Toast>
      <Toast show={confirmation} onClose={() => setConfirmation(false)}>
          <Toast.Header>
            <strong >Success!</strong>
          </Toast.Header>
          <Toast.Body style={{color: 'black'}}>Thank you, message sent! We'll respond to you post haste.</Toast.Body>
      </Toast>
      <Toast show={oops} onClose={() => setOops(false)} style={{color: 'black'}}>
        <Toast.Header>
          <strong >Oops!</strong>
        </Toast.Header>
        <Toast.Body style={{color: 'black'}}>There was an error in sending your message, please try again later.</Toast.Body>
      </Toast>
      <Form onSubmit={sendMessage} className={isFormVisible}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" autoComplete="off"  value={email} onChange={(e) => setEmail(e.target.value)}/>
          {invalidEmail}
        </Form.Group>
        <Form.Group controlId="formBasicTextArea">
          <Form.Label>Message</Form.Label>
          <Form.Control rows="3" as="textarea" autoComplete="off" placeholder="Enter your message here." value={message} onChange={(e) => setMessage(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Form>
      <div ref={submitButton} />
    </Container>
  )
}

export default ContactForm;