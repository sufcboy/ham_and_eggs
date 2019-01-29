import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PigSelector extends Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }
    onSelect(e) {
        this.props.onSelect('numberOfPigs', e.target.value);
    }
    render() {
      return (
        <div className="form-group text-left">
            <label htmlFor="numberOfPigs">Select number of pigs</label>
            <div className="row">
                <div className="col-6">
                    <p>INSERT IMAGE OF PIG HERE</p>
                </div>
                <div className="col-6">
                    <select className="form-control" id="numberOfPigs" onChange={this.onSelect}>
                        <option value="10">10</option>
                        <option value="9">9</option>
                        <option value="8">8</option>
                        <option value="7">7</option>
                        <option value="6">6</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </div>
            </div>
        </div>
      );
    }
}

PigSelector.propTypes = {
    onSelect: PropTypes.func.isRequired
};

export default PigSelector;