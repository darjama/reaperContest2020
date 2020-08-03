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
      message: '',
      progress: 0,
      validFile: false,
    }
  }

  componentDidMount() {
    bsCustomFileInput.init()
  }

  checkFileSize(event) {
    let files = event.target.files
    let size = 62914560;
    let err = "";
    for(var x = 0; x<files.length; x++) {
      if (files[x].size > size) {
      err += files[x].type+' is > 60MB. Please make sure you have not included any of the original media files, or contact us to deliver the file another way.\n';
      }
    };
    if (err !== '') {
      event.target.value = null
      console.log(err)
      return false
    }
    return true;
  }

  checkMimeType(event) {
    let files = event.target.files
    let err = ''
   const type = 'application/zip'
    for(var x = 0; x < files.length; x++) {
         if (files[x].type !== type) {
         err += files[x].type+' is not a zip file. Please upload a zip file.\n';
       }
     };
   if (err !== '') { // if message not same old that mean has error
        event.target.value = null // discard selected file
        console.log(err)
         return false;
    }
   return true;
  }

  onChangeHandler(event) {
          var files = event.target.files
      if(this.checkFileSize(event) && this.checkMimeType(event)){
      // if return true allow to setState
         this.setState({
         selectedFile: files[0],
         validFile: true
      })
    } else {
      this.setState({
        selectedFile: null,
        validFile: false
      })
    }
  }

  textChangeHandler(e) {
    e.preventDefault();
    this.setState({[e.target.id]: e.target.value})
  }

  clickHandler(e) {
    e.preventDefault();

    const data = new FormData();
    const config = {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded/progressEvent.total);
        this.setState({progress: progressEvent.loaded/progressEvent.total})
      },
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
      .catch(err => {console.log(err)})
  }

  render() {
    return(
      <React.Fragment>
        <Hero name='Submit Your Mix'/>
        <Container style={{width: '50%', color: "white"}}>
          <PreModal/>

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
            <Button variant="primary" type="submit" disabled={!this.state.validFile} onClick={() => this.clickHandler(event)}>
                Submit
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    )
  }
}

export default Submit;