import React, { Component } from 'react';
import { Link } from "react-router-dom";

class TimerPage extends Component {
    render() {
      return (
          <div>
            <p>Welcome to the home of ham and eggs</p>
            <Link to="/setup">Another meeting?</Link>
          </div>
      );
    }
}

export default TimerPage;