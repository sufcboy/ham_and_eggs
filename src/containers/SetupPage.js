import React from 'react';
import PigSelector from '../components/PigSelector';
import ChickenSelector from '../components/ChickenSelector';
import RandomSelector from '../components/RandomSelector';
import PropTypes from 'prop-types';

function SetupPage(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <PigSelector
                        onSelect={(el, val) => {props.pigSelect(val);}} initialNumberOfPigs={props.initialNumberOfPigs}>
                    </PigSelector>
                    <ChickenSelector onSelect={(el, val) => {props.chickenSelect(val);}}></ChickenSelector>
                    <RandomSelector onSelect={(el, val) => {props.randomSelect(val);}}></RandomSelector>
                    <button onClick={props.submitAction} className="btn btn-primary">Start meeting</button>
                </div>
            </div>
        </div>
    );
}

SetupPage.propTypes = {
    pigSelect: PropTypes.func.isRequired,
    chickenSelect: PropTypes.func.isRequired,
    randomSelect: PropTypes.func.isRequired,
    submitAction: PropTypes.func.isRequired
};

export default SetupPage;