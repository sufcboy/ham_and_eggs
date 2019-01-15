import React, { Component } from 'react';

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
        <div class="form-group">
            <label for="numberOfPigs">Select number of pigs</label>
            <select class="form-control" id="numberOfPigs" onChange={this.onSelect}>
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
      );
    }
}

export default PigSelector;