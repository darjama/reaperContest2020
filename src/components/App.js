import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Navbar.js';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div>
        <NavBar/>
        React has loaded
      </div>
    )
  }
}

export default App;