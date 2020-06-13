import React from 'react';
import NavBar from './Navbar.js';
import Vote from './Vote.js';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div>
        <NavBar/>
        <Vote/>
      </div>
    )
  }
}

export default App;