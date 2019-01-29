import React from 'react';
import PropTypes from 'prop-types';

function SkipButton(props) {
    console.log(props);
	return (
		<div>
			<button onClick={props.processSkip} className="btn btn-primary">{props.skipLabel}</button>
		</div>
	);
}

SkipButton.propTypes = {
	processSkip: PropTypes.func.isRequired,
	skipLabel: PropTypes.string.isRequired
};

export default SkipButton;