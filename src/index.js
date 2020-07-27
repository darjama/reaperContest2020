import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import combinedReducers from './reducers';
import App from './components/Home/App.js';
import NavBar from './components/Navbar.js';
import GetStarted from './components/GetStarted/GetStarted.js';
import Vote from './components/Vote/Vote.js';
import Submit from './components/Submit/Submit.js';
import Loader from './components/common/Loader';
import './css/main.css'

const app = document.getElementById('app');
const store = createStore(combinedReducers, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
  <Loader/>
  <BrowserRouter>
    <NavBar/>
      <Route exact path="/" component={App} />
      <Route path="/Vote" component={Vote} />
      <Route path="/GetStarted" component={GetStarted} />
      <Route path="/Submit" component={Submit} />
  </BrowserRouter>
</Provider>
, app);