import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ParticipantDisplay extends Component {
    render() {
        this.imageSrc = (this.props.participantType === 'pig') ? 'pig-small.png' : 'chicken-small.png';

        return <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 offset-2 col-8">
                        <div className="card mb-3 shadow-sm">
                            <div>
                                {(this.props.participantType === 'pig') ? (
                                    <img src="/assets/pig-small.png" alt="Pig"/>
                                ) : (
                                    <img src="/assets/chicken-small.png" alt="Chicken"/>
                                )}

                            </div>
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