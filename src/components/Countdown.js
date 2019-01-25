import React, { Component } from 'react';

class Countdown extends Component {
    constructor(props) {
        super(props);
        let currentSeconds = parseInt(props.seconds, 10);

        // Define to allow us to clear if skipped
        this.timeout = null;

        this.countdownTimeout.bind(this);
        this.clearTimeoutInterval.bind(this);
        this.countdownTimeout(currentSeconds, props.timeoutCallback)
    }
    clearTimeoutInterval() {
        clearInterval(this.timeout);
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
console.log(currentSeconds);
            let mins = Math.floor(currentSeconds / 60);
console.log(mins);

            document.getElementById('minutes').innerHTML = mins;
            document.getElementById('seconds').innerHTML = (currentSeconds - (mins * 60));

            if (currentSeconds === 0) {
                clearInterval(this.timeout);
                callback();
            }
        }.bind(this), 1000);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 offset-sm-1 col-md-3 col-sm-5 col-6">
                        <div className="card mb-2 shadow-sm">
                            <div className="border m-sm p-sm">
                                <p id="minutes" className="h2"></p>
                            </div>
                            <div className="card-body bg-light">
                                <p className="card-text">Mins</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-5 col-6">
                        <div className="card mb-2 shadow-sm">
                            <div className="border m-sm p-sm">
                                <p id="seconds" className="h2"></p>
                            </div>
                            <div className="card-body bg-light">
                                <p className="card-text">Seconds</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Countdown;