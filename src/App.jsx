import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ScrollHandler from './containers/ScrollHandler';

import Header from './components/Header';
import Footer from './components/Footer';

import Brazil from './pages/Brazil';
import Region from './pages/Region';
import State from './pages/State';
import City from './pages/City';
// import About from './pages/About';

import './styles/App.scss';

const App = () => (
  <Router>
    <ScrollHandler />

    <Header />

    <div className="page-container">
      <Switch>
        <Route path="/:region/:state/:city" component={ City } />
        <Route path="/:region/:state" component={ State } />
        <Route path="/:region" component={ Region } />
        {/* <Route path="/sobre" component={ About } /> */}
        <Route path="/" component={ Brazil } />
      </Switch>
    </div>

    <Footer />
  </Router>
);

export default App;
