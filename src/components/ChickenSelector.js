import React, { Component } from 'react';

class ChickenSelector extends Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }
    onSelect(e) {
        this.props.onSelect('numberOfChickens', e.target.value);
    }
    render() {
      return (
        <div className="form-group">
            <label htmlFor="numberOfChicken">Select number of chickens</label>
            <select className="form-control" id="numberOfChicken" onChange={this.onSelect}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
      );
    }
}

export default ChickenSelector;