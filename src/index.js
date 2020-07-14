import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combinedReducers from './reducers';
import App from './components/App.js';
import NavBar from './components/Navbar.js';
import Vote from './components/Vote/Vote.js';
import Submit from './components/Submit.js';

const app = document.getElementById('app');
const store = createStore(combinedReducers);

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <NavBar/>
      <Route exact path="/" component={App} />
      <Route path="/Vote" component={Vote} />
      <Route path="/Submit" component={Submit} />
  </BrowserRouter>
</Provider>
, app);