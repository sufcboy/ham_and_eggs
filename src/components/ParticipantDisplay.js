import React, { Component } from 'react';

class ParticipantDisplay extends Component {
    render() {
        return <div>
            <p id="display">{this.props.participantId} - {this.props.participantType}</p>
        </div>;
    }
}

export default ParticipantDisplay;