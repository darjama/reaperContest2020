import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Hero from '../common/Hero';
import ContactForm from '../common/ContactForm';

var Contact = function (props) {
  React.useEffect(() => {
    document.title = 'reaMIXed: Contact Us';
  }, []);

  return (
    <React.Fragment>
      <Hero name='Contact Us' />
      <Container fluid>
        <Card style={{ maxWidth: '45rem', margin: '1rem auto' }}>
          <Card.Body>
            <Card.Title className='text-center rem2 cuprum'>
              Send Us a Message
            </Card.Title>
            <Card.Text>
              Have a question about the contest? Want to arrange another way to
              deliver a file? Send us a message and we'll get back to you.
            </Card.Text>
            <ContactForm />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Contact;
