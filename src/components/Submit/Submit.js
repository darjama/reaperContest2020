import React from 'react';
import {connect} from 'react-redux';
import { Form, Button, Container, Toast, ProgressBar } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import axios from 'axios';
import PreModal from './PreModal';
import Hero from '../common/Hero';
import NotNow from '../common/NotNow';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      email: '',
      message: '',
      progress: 0,
      validFile: false,
      showToast: false,
      emailWarning: 'A valid email address is required',
      sizeWarning: '',
      typeWarning: '',
      ToastMessage: '',
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

      err += files[x].name+' is > 60MB. Please make sure you have not included any of the original media files, or contact us to deliver the file another way.\n';
      }
    };
    this.setState({sizeWarning: err})
    if (err !== '') {
      event.target.value = null

      return false
    }
    return true;
  }

  checkMimeType(event) {
    let files = event.target.files
    let err = ''
   const type = ['application/zip', 'application/octet-stream', 'application/x-zip-compressed', 'multipart/x-zip']
    for(var x = 0; x < files.length; x++) {
         if (!type.includes(files[x].type)) {
         err += files[x].name + ' is not a zip file. Please upload a zip file.\n';
       }
     };
     this.setState({typeWarning: err})
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

  closeToast() {
    this.setState({
      progress: 0,
      showToast: false,
      ToastMessage: '',
    })
  }

  textChangeHandler(e) {
    e.preventDefault();
    this.setState({[e.target.id]: e.target.value})
    if (e.target.id === 'email') {
      this.setState({
        emailWarning: this.validateEmail(this.state.email) ? '' : 'A valid email address is required'
      })
    }
  }


  validateEmail(testString) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(String(testString).toLowerCase());
    return result;
  }

  clickHandler(e) {
    e.preventDefault();
    this.setState({ showToast: true, toastMessage: '' })
    const date = new Date();
    const fileName = Date.now().toString() + '-' + this.state.selectedFile.name;
    const contestId = date.getFullYear().toString() + (date.getMonth() > 8 ? '': '0') +(date.getMonth() + 1).toString();
    const data = {
      email: this.state.email,
      message: this.state.message,
      filename: fileName,
      success: false
    }
    axios.get(`/api/upload?filename=${fileName}`).then(res => {
      const config = {
        onUploadProgress: progressEvent => {
          this.setState({progress: progressEvent.loaded/progressEvent.total})
        },
        headers: {
          //'Content-Length': this.state.selectedFile.size,
          'Content-Type': 'application/octet-stream',
        }
      };
      let url= res.data //+ '&uploadType=resumable';
      console.log(url);
      return axios.put(url, this.state.selectedFile, config)
    }).then(res => {
      this.setState({toastMessage: 'Upload Complete, thanks for entering!'})
      data.success = true;
      axios.post('/api/entry', data).then(res => console.log(res)).catch(err => console.log(err));
    }).catch(err => {
        console.log(err);
        axios.post('/api/entry', data).then(res => console.log(res)).catch(err => console.log(err));
        this.setState({toastMessage: 'There was an error with your upload, please try again later or use the contact form to make arrangements to send a link to your file.'})
      })

  }

  render() {
    const {startdate, duedate, votestart} = this.props.details;
    console.log(startdate,duedate);
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const early = `The contest hasn't started yet. Come back on  ${new Date(startdate).toLocaleDateString('en-US', options)}.`
    const late = `Sorry, you've missed the deadline for submissions. Come back to cast your vote on ${new Date(votestart).toLocaleDateString('en-US', options)}.`
    return(
      <React.Fragment>
        <Hero name='Submit Your Mix'/>
        <Container style={{width: '50%', color: "white"}}>
          {new Date() >= new Date(startdate) && new Date() <= new Date(duedate) ? <PreModal/> :
          <NotNow start={startdate} end={duedate} early={early} late={late}/>}
          <br/>
          <Form>
            <Form.Label >Email address:</Form.Label>
            <Form.Control type="email" id="email" placeholder="Enter email" autoComplete="off" onChange={()=> this.textChangeHandler(event)}/>
            <div disabled={this.state.emailWarning === ''} style={{color:'red'}}>{this.state.emailWarning}</div>
            <br/>
            <Form.Label>Message:</Form.Label>
            <Form.Control as="textarea" id="message" autoComplete="off" rows="3" placeholder="Let me know your Reaper forum user name" onChange={()=> this.textChangeHandler(event)}/>
            <br/>
            <Form.Label>Your zip file:</Form.Label>
            <Form.File
              id="custom-file"
              label="Select your zip file here"
              custom
              onChange={() => this.onChangeHandler(event)}
            />
            <div disabled={this.state.sizeWarning === ''} style={{color: 'red'}}>{this.state.sizeWarning}</div>
            <div disabled={this.state.typeWarning === ''} style={{color: 'red'}}>{this.state.typeWarning}</div>
            <br/> <br/>
            <Button variant="primary" type="submit" disabled={!this.state.validFile || !(this.state.emailWarning === '')} onClick={() => this.clickHandler(event)}>
                Submit
            </Button>
          </Form>
          <br/>
          <Toast show={this.state.showToast} onClose={() => this.closeToast()}>
          <Toast.Header>
            <strong className="mr-auto">Uploading File</strong>
          </Toast.Header>
          <Toast.Body style={{color: 'red'}}>
            <ProgressBar now={this.state.progress*100}/>
            <br/>
            {this.state.toastMessage}
          </Toast.Body>
        </Toast>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    details: state.contestDetailReducer,
  }
}

export default connect(mapStateToProps)(Submit)