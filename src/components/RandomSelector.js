import React, { Component } from 'react';

class RandomSelector extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.props.onSelect('random', e.target.checked);
    }
    render() {
      return (
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="random" name="random" onChange={this.onChange}></input>
            <label class="form-check-label" htmlFor="random">Randomise participant</label>
        </div>
      );
    }
}

export default RandomSelector;