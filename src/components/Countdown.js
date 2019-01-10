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

        // Define to allow us to clear if skipped
        this.timeout = null;

        this.countdownTimeout.bind(this);
        this.countdownTimeout(currentSeconds, props.timeoutCallback)
    }
    countdownTimeout(currentSeconds, callback) {
        // Allow us to clear timeout with skip button
        if (null !== this.timeout) {
            clearInterval(this.timeout);
        }

        this.timeout = setInterval(function() {
            currentSeconds--;
            document.getElementById('seconds').innerHTML = currentSeconds;

            if (currentSeconds === 0) {
                clearInterval(this.timeout);
                callback();
            }
        }.bind(this), 1000);
    }
    render() {
        return <div>
            <p id="seconds">{this.props.seconds}</p>
        </div>;
    }
}

export default Countdown;