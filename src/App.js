import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Regions from './pages/Regions'
// import States from './pages/States';
// import Cities from './pages/Cities';
// import Hospitals from './pages/Hospitals';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'
          render={ (props) => <Regions { ...props } />}
        />
        {/* <Route path='/:region'
          render={ (props) => <States { ...props } />}
        />
        <Route path='/:region/:state'
          render={ (props) => <Cities { ...props } />}
        />
        <Route path='/:region/:state/:city'
          render={ (props) => <Hospitals { ...props } />}
        /> */}
      </Switch>
    </Router>
  );
}

export default App;
