import React, { Component } from 'react';
import { Link } from "react-router-dom";

class HomePage extends Component {
    render() {
      return (
          <div>
            <p>Welcome to the home of ham and eggs</p>
            <Link to="/setup">Start a new meeting</Link>
          </div>
      );
    }
  }

  export default HomePage;