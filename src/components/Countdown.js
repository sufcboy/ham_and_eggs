import React, { Component } from 'react';

// const countdownTimeout = function(currentSeconds, callback) {
//     let timeout = setInterval(function() {
//         currentSeconds--;
//         document.getElementById('seconds').innerHTML = currentSeconds;

//         if (currentSeconds === 0) {
//             clearInterval(timeout);
//             callback();
//         }
//     }, 1000);
// }

class Countdown extends Component {
    constructor(props) {
        super(props);
        let currentSeconds = parseInt(props.seconds, 10);
        console.log(currentSeconds);
        this.countdownTimeout(currentSeconds, props.timeoutCallback)
    }
    countdownTimeout(currentSeconds, callback) {
        let timeout = setInterval(function() {
            currentSeconds--;
            document.getElementById('seconds').innerHTML = currentSeconds;

            if (currentSeconds === 0) {
                clearInterval(timeout);
                callback();
            }
        }, 1000);
    }
    render() {
        return <div>
            <p id="seconds">{this.props.seconds}</p>
        </div>;
    }
}

export default Countdown;