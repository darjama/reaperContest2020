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
    }
  }

  componentDidMount() {
    bsCustomFileInput.init()
  }

  onChangeHandler(event) {
    this.setState({selectedFile: event.target.files[0]})
  }

  clickHandler(e) {
    e.preventDefault();
    const data = new FormData()
    const config = {
      onUploadProgress: progressEvent => console.log(progressEvent.loaded/progressEvent.total)
    }
    data.append('file', this.state.selectedFile)
    axios.post('/upload', data, config)
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }

  render() {
    return(
      <React.Fragment>
        <Hero name='Sumbit Your Mix'/>
        <Container style={{width: '50%', color: "white"}}>
          <PreModal/>

          <br/>
          <Form>
            <Form.Label >Email address:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <br/>
            <Form.Label>Message:</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="Let me know your Reaper forum user name"/>
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