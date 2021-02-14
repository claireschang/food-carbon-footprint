import React,{Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  } from "react-router-dom";
import Vehicle from './pages/Vehicle';
import Home from './pages/Home';
import Shipping from './pages/Shipping';
import Electricity from './pages/Electricity';
import Food from './pages/Food';

class App extends Component {

  //only for navigation
  render(){
    return (
      <div>

        <Router>
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <span><Link className="navbar-brand h2" to='/'>Carbonology</Link></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Carbon Emission</a>
                  <div className="dropdown-menu">
                      <Link className="dropdown-item" to='/vehicle'>Driving</Link>
                      <Link className="dropdown-item" to = '/shipping'>Shipping</Link>
                      <Link className="dropdown-item" to = '/electricity'>Electricity</Link>
                      <Link className="dropdown-item" to = '/food'>Food</Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path='/vehicle'>
              <Vehicle />
            </Route>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path = '/shipping'>
              <Shipping />
            </Route>
            <Route exact path = '/electricity'>
              <Electricity />
            </Route>
            <Route exact path = '/food'>
              <Food />
            </Route>

          </Switch>
        </Router>

      </div>
  )};
}

export default App;