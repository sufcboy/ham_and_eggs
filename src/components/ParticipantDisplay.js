import React, { Component } from 'react';

class ParticipantDisplay extends Component {
    render() {
        return <div>
            <p id="display">{this.props.id} - {this.props.type}</p>
        </div>;
    }
}

export default ParticipantDisplay;