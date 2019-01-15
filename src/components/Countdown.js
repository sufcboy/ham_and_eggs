import React, { Component } from 'react';

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

        // Flag to avoid decrement on first call
        let roundOne = true;

        this.timeout = setInterval(function() {
            if (roundOne === true) {
                roundOne = false
            } else {
                currentSeconds--;
            }

            document.getElementById('seconds').innerHTML = currentSeconds;

            if (currentSeconds === 0) {
                clearInterval(this.timeout);
                callback();
            }
        }.bind(this), 1000);
    }
    render() {
        return (
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="lead" id="seconds"></div>
                </div>
            </div>
        );
    }
}

export default Countdown;