import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

// import './App.css';
import Login from './components/Login';
import Create from './components/Create';
import GetCar from './components/GetCar';

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Route exact path='/' component={Login} />
            <div className="container">
              <Route exact path='/create' component={Create}/>
              <Route exact path='/getcar' component={GetCar}/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
