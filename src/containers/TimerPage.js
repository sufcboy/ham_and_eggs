import React, { Component } from 'react';

function TimerPage(props) {
    return (
        <div>
            <p>Beginning meeting!</p>
            <p>Number of chickens - {props.numberOfChickens}</p>
        </div>
    );
}

export default TimerPage;