import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Regions from './pages/Regions';
import States from './pages/States';
import Cities from './pages/Cities';
// import Hospitals from './pages/Hospitals';

import './App.css';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <Regions { ...props } /> }
        />
        <Route
          exact
          path="/about"
          render={ (props) => <About { ...props } /> }
        />
        <Route
          exact
          path="/:region"
          render={ (props) => <States { ...props } /> }
        />
        <Route
          exact
          path="/:region/:state"
          render={ (props) => <Cities { ...props } /> }
        />
      </Switch>
    </Router>
  );
}

export default App;
