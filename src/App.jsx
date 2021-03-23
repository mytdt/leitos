import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Regions from './pages/Regions';
import States from './pages/States';
// import Cities from './pages/Cities';
// import Hospitals from './pages/Hospitals';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="page-container">
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Regions { ...props } /> }
          />
          <Route
            exact
            path="/:region"
            render={ (props) => <States { ...props } /> }
          />
          {/* <Route
            exact
            path='/:region/:state'
            render={ (props) => <Cities { ...props } />}
          />
          <Route
            exact
            path='/:region/:state/:city'
            render={ (props) => <Hospitals { ...props } />}
          /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
