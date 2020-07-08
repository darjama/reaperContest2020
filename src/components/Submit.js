import React from 'react';
import { Form, Button } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import axios from 'axios';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
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
    data.append('file', this.state.selectedFile)
    axios.post("/upload", data, { // receive two parameter endpoint url ,form data
      })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }

  render() {
    return(
      <div style={{width: '50%'}}>
        Upload Your File
        <Form>
          <Form.File
            id="custom-file"
            label="Custom file input"
            custom
            onChange={() => this.onChangeHandler(event)}
          />
          <Button variant="primary" type="submit" onClick={() => this.clickHandler(event)}>
              Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default Submit;