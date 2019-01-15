import React from 'react';

function SkipButton(props) {
    console.log(props);
	return (
		<div>
			<button onClick={props.processSkip} class="btn btn-primary">{props.skipLabel}</button>
		</div>
	);
}

export default SkipButton;