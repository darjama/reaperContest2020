import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import combinedReducers from './reducers';
import App from './components/Home/App.js';
import Archive from './components/Archive/Archive.js';
import NavBar from './components/NavBar.js';
import GetStarted from './components/GetStarted/GetStarted.js';
import Vote from './components/Vote/Vote.js';
import Submit from './components/Submit/Submit.js';
import Loader from './components/common/Loader';
import Footer from './components/common/Footer';
import './css/main.css'

const app = document.getElementById('app');
const store = createStore(combinedReducers, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
  <Loader/>
  <div style={{minHeight:'90vh'}}>
  <BrowserRouter>
    <NavBar/>
      <Route exact path="/" component={App} />
      <Route path="/Vote" component={Vote} />
      <Route path="/GetStarted" component={GetStarted} />
      <Route path="/Submit" component={Submit} />
      <Route path="/Archive" component={Archive} />
  </BrowserRouter>
  </div>
  <Footer/>
</Provider>
, app);