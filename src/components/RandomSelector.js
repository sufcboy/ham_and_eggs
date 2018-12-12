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
        <div>
            <label htmlFor="random">
                Randomise the order
                <input type="checkbox" name="random" id="random" onChange={this.onChange}/>
            </label>
        </div>
      );
    }
}

export default RandomSelector;