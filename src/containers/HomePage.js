import React from 'react';

function HomePage(props) {
	return (
		<div>
			<h3 className="mb-0">
				<a className="text-dark" href="/">Start a daily stand up!</a>
			</h3>
			<p>Hit 'Get started' to set up your meeting</p>
			<button className="btn btn-primary" onClick={props.getStarted}>Get started</button>
		</div>
	);
}

export default HomePage;