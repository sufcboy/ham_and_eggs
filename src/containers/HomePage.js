import React from 'react';

function HomePage(props) {
	return (
		<div>
			<p className="lead">A tool to help enforce the time for your daily stand up meeting.</p>
			<button className="btn btn-primary" onClick={props.getStarted}>Get started</button>
		</div>
	);
}

export default HomePage;