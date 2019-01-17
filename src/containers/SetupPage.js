import React from 'react';
import PigSelector from '../components/PigSelector';
import ChickenSelector from '../components/ChickenSelector';
import RandomSelector from '../components/RandomSelector';

function SetupPage(props) {
    return (
        <div>
            <PigSelector onSelect={(el, val) => {props.pigSelect(val);}}></PigSelector>
            <ChickenSelector onSelect={(el, val) => {props.chickenSelect(val);}}></ChickenSelector>
            <RandomSelector onSelect={(el, val) => {props.randomSelect(val);}}></RandomSelector>
            <button onClick={props.submitAction} className="btn btn-primary">Start meeting</button>
        </div>
    );
}

export default SetupPage;