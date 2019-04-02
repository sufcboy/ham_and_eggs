import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ParticipantDisplay extends Component {
    render() {
        return <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 offset-2 col-8">
                        <div className="card mb-3 shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">
                            <title>Placeholder</title>
                            <rect fill="#55595c" width="100%" height="100%"/>
                                <text fill="#eceeef" x="50%" y="50%">Thumbnail</text>
                            </svg>
                            <div className="card-body">
                                <p className="card-text">{this.props.participantType} {this.props.participantId}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

ParticipantDisplay.propTypes = {
    participantType: PropTypes.oneOf(['Pig', 'Chicken']),
    participantId: PropTypes.number.isRequired
};

export default ParticipantDisplay;