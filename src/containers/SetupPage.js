import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PigSelector from '../components/PigSelector';
import ChickenSelector from '../components/ChickenSelector';
import RandomSelector from '../components/RandomSelector';

class SetupPage extends Component {
    constructor(props) {
        super(props);
        this.onFormChange = this.onFormChange.bind(this);
    }
    formValues = {
        'numberOfPigs': '6',
        'numberOfChickens': '0',
        'random': false,
    }
    onFormChange(element, value) {
        console.log(element, value);
        this.formValues[element] = value;
        console.log(this.formValues);
    }
    render() {
      return (
          <div>
            <p>Welcome to the home of ham and eggs</p>
            <PigSelector onSelect={this.onFormChange}></PigSelector>
            <ChickenSelector onSelect={this.onFormChange}></ChickenSelector>
            <RandomSelector onSelect={this.onFormChange}></RandomSelector>
            <Link to='/timer'>Begin meeting</Link>
          </div>
      );
    }
}

export default SetupPage;