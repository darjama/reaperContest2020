import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import axios from 'axios';
import PreModal from './PreModal';
import Hero from '../common/Hero';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      email: '',
      message: ''
    }
  }

  componentDidMount() {
    bsCustomFileInput.init()
  }

  onChangeHandler(event) {
    this.setState({selectedFile: event.target.files[0]})
  }

  textChangeHandler(e) {
    e.preventDefault();
    console.log(e.target.type, e.target.value, this.state.email, this.state.message);
    this.setState({[e.target.id]: e.target.value})
  }
  clickHandler(e) {
    e.preventDefault();

    const data = new FormData();
    console.log(data);
    const config = {
      onUploadProgress: progressEvent => console.log(progressEvent.loaded/progressEvent.total),
      headers: {
          'Content-Type': 'multipart/form-data'
        },
    }
    data.append('file', this.state.selectedFile);
    data.set('email', this.state.email);
    data.set('message', this.state.message);
    axios.post('/upload', data, config)
      .then(res => {
        console.log(res.statusText)
      })
  }

  render() {
    return(
      <React.Fragment>
        <Hero name='Submit Your Mix'/>
        <Container style={{width: '50%', color: "white"}}>
          {/* <PreModal/> */}

          <br/>
          <Form>
            <Form.Label >Email address:</Form.Label>
            <Form.Control type="email" id="email" placeholder="Enter email" onChange={()=> this.textChangeHandler(event)}/>
            <br/>
            <Form.Label>Message:</Form.Label>
            <Form.Control as="textarea" id="message" rows="3" placeholder="Let me know your Reaper forum user name" onChange={()=> this.textChangeHandler(event)}/>
            <br/>
            <Form.Label>Your zip file:</Form.Label>
            <Form.File
              id="custom-file"
              label="Select your zip file here"
              custom
              onChange={() => this.onChangeHandler(event)}
            />
            <br/> <br/>
            <Button variant="primary" type="submit" onClick={() => this.clickHandler(event)}>
                Submit
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    )
  }
}

export default Submit;