import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PigSelector from '../components/PigSelector';
import ChickenSelector from '../components/ChickenSelector';

class SetupPage extends Component {
    render() {
      return (
          <div>
            <p>Welcome to the home of ham and eggs</p>
            <PigSelector></PigSelector>
            <ChickenSelector></ChickenSelector>
            <div>
                <label htmlFor="random">
                    Randomise the order
                    <input type="checkbox" name="random" id="random" />
                </label>
            </div>

            <Link to="/timer">Begin meeting</Link>
          </div>
      );
    }
}

export default SetupPage;