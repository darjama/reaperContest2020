import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './components/App.js';
import NavBar from './components/Navbar.js';
import Vote from './components/Vote.js';
import Submit from './components/Submit.js';


const app = document.getElementById('app');
ReactDOM.render(
<BrowserRouter>
  <NavBar/>
    <Route exact path="/" component={App} />
    <Route path="/Vote" component={Vote} />
    <Route path="/Submit" component={Submit} />
</BrowserRouter>, app);