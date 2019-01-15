import React from 'react';

function HomePage(props) {
	return (
		<div>
			<h3 class="mb-0">
				<a class="text-dark" href="#">Start a daily stand up!</a>
			</h3>
			<p>Hit 'Get started' to set up your meeting</p>
			<button class="btn btn-primary" onClick={props.getStarted}>Get started</button>
		</div>
	);
}

export default HomePage;