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
        <div className="form-group text-left">
            <label htmlFor="numberOfChicken">Select number of chickens</label>
            <div className="row">
                <div className="col-6">
                    <p>INSERT IMAGE OF Chicken HERE</p>
                </div>
                <div className="col-6">
                    <select className="form-control" id="numberOfChicken" onChange={this.onSelect}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>

        </div>
      );
    }
}

export default ChickenSelector;