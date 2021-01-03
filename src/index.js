import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import loadable from '@loadable/component';
import thunk from 'redux-thunk';
import combinedReducers from './reducers';
const App = loadable(() => import('./components/Home/App.js'));
const Archive = loadable(() => import('./components/Archive/Archive.js'));
const NavBar = loadable(() => import('./components/NavBar.js'));
const GetStarted = loadable(() =>
  import('./components/GetStarted/GetStarted.js')
);
import Vote from './components/Vote/Vote.js';
const Submit = loadable(() => import('./components/Submit/Submit.js'));
const Loader = loadable(() => import('./components/common/Loader'));
const Footer = loadable(() => import('./components/common/Footer'));
const Results = loadable(() => import('./components/Results/Results.js'));
import './css/main.css';

const app = document.getElementById('app');
const store = createStore(combinedReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Loader />
    <div style={{ minHeight: '90vh' }}>
      <BrowserRouter>
        <NavBar />
        <Route exact path='/' component={App} />
        <Route path='/Vote' component={Vote} />
        <Route path='/GetStarted' component={GetStarted} />
        <Route path='/Submit' component={Submit} />
        <Route path='/Archive' component={Archive} />
        <Route path='/Results' component={Results} />
      </BrowserRouter>
    </div>
    <Footer />
  </Provider>,
  app
);
