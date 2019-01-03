import React, { Component } from 'react';
import Countdown from '../components/Countdown';
import ParticipantDisplay from '../components/ParticipantDisplay';

// Recommended meeting length
// const minsPerMeeting = 15;
const minsPerMeeting = 5;
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

class TimerPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfPigs: (this.props.numberOfPigs) ? this.props.numberOfPigs : 6,
            numberOfChickens: (this.props.numberOfChickens) ? this.props.numberOfChickens : 0,
            random: (this.props.random) ? this.props.random : true,
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
        this.state.participantType = 'pig';
        this.state.currentCountdown = this.state.timePerParticipant * pigsPrecedence;
        // this.processNextParticipant();
    }

    processNextParticipant() {
        // Do we have any pigs left?
        if (this.state.pigs.length > 0) {
            this.state.pigs.shift();
            this.setState(prevState => ({
                participantId: this.state.pigs[0],
                participantType: 'pig',
                currentCountdown: this.state.timePerParticipant * pigsPrecedence
            }))
            // this.state.participantId = this.state.pigs[0];
            // this.state.participantType = 'pig';
            // this.state.currentCountdown =  this.state.timePerParticipant * pigsPrecedence;
        } else if (this.state.chickens.length > 0) {
            this.state.chickens.shift();
            this.setState(prevState => ({
                participantId: this.state.chickens[0],
                participantType: 'chicken',
                currentCountdown: this.state.timePerParticipant * chickenPrecedence
            }))
            // this.state.participantId = this.state.chickens[0];
            // this.state.participantType = 'chicken';
            // this.state.currentCountdown =  this.state.timePerParticipant * chickenPrecedence;
        } else {
            alert('Timesup!');
        }


    }
    processTimeout() {
        console.log('CALLED!');
        this.processNextParticipant();
    }
    render() {
        return <div>
            <p>Beginning meeting!</p>
            <Countdown seconds={this.state.currentCountdown} timeoutCallback={this.processTimeout}></Countdown>
            <ParticipantDisplay participantId={this.state.participantId} participantType={this.state.participantType}></ParticipantDisplay>
        </div>;
    }
}

export default TimerPage;