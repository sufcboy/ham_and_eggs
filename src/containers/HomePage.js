import React from 'react';

function HomePage(props) {
	return (
		<div>
			<p>Commodo Lorem dolore sint sint esse magna.</p>
			<button onClick={props.getStarted}>Get started</button>
		</div>
	);
}

export default HomePage;