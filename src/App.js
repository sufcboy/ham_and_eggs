import React, { Component } from 'react';
import './App.css';
import HomePage from './containers/HomePage';
import SetupPage from './containers/SetupPage';
import TimerPage from './containers/TimerPage';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Welcome to Ham and Eggs</h1>
          </header>

          <Route exact path="/" component={HomePage} />
          <Route path="/setup" component={SetupPage} />
          <Route path="/timer" component={TimerPage} />
        </div>
      </Router>
    );
  }
}

export default App;
