import React, { Component } from 'react';
import Countdown from '../components/Countdown';
import ParticipantDisplay from '../components/ParticipantDisplay';
import SkipButton from '../components/SkipButton';
import PropTypes from 'prop-types';

// Recommended meeting length
const minsPerMeeting = 15;
// const minsPerMeeting = 2;
const pigsPrecedence = 2;
const chickenPrecedence = 1;

const getSecondsPerParticipant = function(noOfPigs, noOfChickens) {
    const secondsPerMeeting = minsPerMeeting * 60;
    const totalWithPrecedence = (noOfPigs * pigsPrecedence) + (noOfChickens * chickenPrecedence);

    return Math.floor(secondsPerMeeting / totalWithPrecedence);
}

const shuffle = function(array) {
    let tmp,current,top = array.length;

    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

    return array;
}

const getSkipLabel = function(pigs, chickens) {
    // No chickens and last pig or the number of pigs and chickens is 1 each
    return ((chickens.length === 0 && pigs.length === 1) ||
    (pigs.length === 1 && chickens.length === 1)) ?
    'Finish meeting' : 'Skip';
}

class TimerPage extends Component {
    constructor(props) {
        super(props);
        this.countdown = React.createRef();

        this.state = {
            numberOfPigs: this.props.numberOfPigs,
            numberOfChickens: this.props.numberOfChickens,
            random: this.props.random
        }

        this.state.timePerParticipant = getSecondsPerParticipant(this.state.numberOfPigs, this.state.numberOfChickens);
        this.state.pigs = [];
        this.state.chickens = [];

        for (let i=1; i<=this.state.numberOfPigs;i++) {
            this.state.pigs.push(i);
        }

        for (let j=1; j<=this.state.numberOfChickens;j++) {
            this.state.chickens.push(j);
        }

        if (this.state.random === true) {
            this.state.pigs = shuffle(this.state.pigs);
            this.state.chickens = shuffle(this.state.chickens);
        }

        this.processTimeout = this.processTimeout.bind(this);
        this.processNextParticipant = this.processNextParticipant.bind(this);
        this.state.participantId = this.state.pigs[0];
        this.state.participantType = 'Pig';
        this.state.currentCountdown = this.state.timePerParticipant * pigsPrecedence;
        this.state.skipLabel = getSkipLabel(this.state.pigs, this.state.chickens);
        // this.processNextParticipant();
        this.finishMeeting = props.finishCallback;
    }

    processNextParticipant() {
        console.log(this.state.pigs);
        console.log(this.state.chickens);

        // Do we have any pigs left?
        if (this.state.pigs.length > 1) {
            this.state.pigs.shift();
            this.setState(prevState => ({
                participantId: this.state.pigs[0],
                participantType: 'Pig',
                currentCountdown: this.state.timePerParticipant * pigsPrecedence,
                skipLabel: getSkipLabel(this.state.pigs, this.state.chickens)
            }))

            this.countdown.current.countdownTimeout(
                this.state.currentCountdown,
                this.processNextParticipant
            );
        } else if (this.state.chickens.length > 1) {
            // Only shift the chickens if last participant was chicken
            if (this.state.participantType === 'Chicken') {
                this.state.chickens.shift();
            }

            this.setState(prevState => ({
                participantId: this.state.chickens[0],
                participantType: 'Chicken',
                currentCountdown: this.state.timePerParticipant * chickenPrecedence,
                skipLabel: getSkipLabel(this.state.pigs, this.state.chickens)
            }))
            this.countdown.current.countdownTimeout(
                this.state.currentCountdown,
                this.processNextParticipant
            );
        } else {
            this.countdown.current.clearTimeoutInterval();
            this.processFinish();
        }
    }
    processTimeout() {
        console.log('Timeout!');
        this.processNextParticipant();
    }
    processSkip() {
        console.log('Skip!');
        this.processNextParticipant();
    }
    processFinish() {
        console.log('Meeting finished!');
        this.finishMeeting();
    }
    render() {
        return <div>
            <Countdown ref={this.countdown} seconds={this.state.currentCountdown} timeoutCallback={this.processTimeout}></Countdown>
            <ParticipantDisplay participantId={this.state.participantId} participantType={this.state.participantType}></ParticipantDisplay>
            <SkipButton processSkip={this.processTimeout} skipLabel={this.state.skipLabel}></SkipButton>
        </div>;
    }
}

TimerPage.defaultProps = {
    numberOfPigs: 6,
    numberOfChickens: 0,
    random: true
};

TimerPage.propTypes = {
    numberOfPigs: PropTypes.number,
    numberOfChickens: PropTypes.number,
    random: PropTypes.bool,
    finishCallback: PropTypes.func.isRequired
};

export default TimerPage;