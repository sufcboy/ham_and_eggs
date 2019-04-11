import React, { Component } from 'react';
import Countdown from '../components/Countdown';
import ParticipantDisplay from '../components/ParticipantDisplay';
import SkipButton from '../components/SkipButton';
import PropTypes from 'prop-types';

const fillAnimalsArray = (numberOfAnimal) => {
  const animalArray = [];
  for (let i = 1; i <= numberOfAnimal; i++) {
    animalArray.push(i);
  }
  return animalArray;
}

class TimerPage extends Component {
  pigsPrecedence = 2
  chickenPrecedence = 1
  minsPerMeeting = 15
  typePig = 'Pig'
  typeChicken = 'Chicken'
  constructor(props) {
    super(props);
    this.countdown = React.createRef();

    // Initialise the state
    this.state = {
      numberOfPigs: this.props.numberOfPigs,
      numberOfChickens: this.props.numberOfChickens,
      random: this.props.random
    }

    // Time related states
    this.state.timePerParticipant = this.getSecondsPerParticipant(
      this.state.numberOfPigs,
      this.state.numberOfChickens
    );
    this.state.currentCountdown = this.state.timePerParticipant * this.pigsPrecedence;

    // Pigs and chickens
    this.initialisePigsAndChickens();

    // Bind instance to these methods
    this.processTimeout = this.processTimeout.bind(this);
    this.processNextParticipant = this.processNextParticipant.bind(this);

    // Assign finish callback
    this.finishMeeting = props.finishCallback;
  }
  initialisePigsAndChickens() {
    this.state.pigs = fillAnimalsArray(this.state.numberOfPigs);
    this.state.chickens = fillAnimalsArray(this.state.numberOfChickens);

    if (this.state.random === true) {
      this.state.pigs = this.shuffle(this.state.pigs);
      this.state.chickens = this.shuffle(this.state.chickens);
    }

    // First participant
    this.state.participantId = this.state.pigs[0];
    this.state.participantType = this.typePig;
    this.state.skipLabel = this.getSkipLabel(this.state.pigs, this.state.chickens);
  }
  getSecondsPerParticipant(noOfPigs, noOfChickens) {
    const secondsPerMeeting = this.minsPerMeeting * 60;
    const totalWithPrecedence = (noOfPigs * this.pigsPrecedence) + (noOfChickens * this.chickenPrecedence);

    return Math.floor(secondsPerMeeting / totalWithPrecedence);
  }
  shuffle(array) {
    let tmp,current,top = array.length;

    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

    return array;
  }
  getSkipLabel(pigs, chickens) {
    const remainingParticipants = pigs.length + chickens.length;
    // No chickens and last pig or the number of pigs and chickens is 1 each
    return (remainingParticipants === 1 ||
        (pigs.length === 1 && chickens.length === 1)) ?
      'Finish meeting' : 'Skip';
  }
  processNextParticipant() {
    // No more participants
    if (this.state.pigs.length === 0 && this.state.chickens.length === 0) {
      this.countdown.current.clearTimeoutInterval();
      this.processFinish();
      return;
    }

    // Skip to the next participant
    if (this.state.chickens.length > 1 && this.state.participantType === this.typeChicken) {
      this.state.chickens.shift();
    } else {
      this.state.pigs.shift();
    }

    // Update state
    this.setState(prevState => ({
      participantId: (this.state.pigs.length > 1) ? this.state.pigs[0] : this.state.chickens[0],
      participantType: (this.state.pigs.length > 1) ? this.typePig : this.typeChicken,
      currentCountdown: this.state.timePerParticipant * ((this.state.pigs.length > 1) ? this.pigsPrecedence : this.chickenPrecedence),
      skipLabel: this.getSkipLabel(this.state.pigs, this.state.chickens)
    }))

    this.countdown.current.countdownTimeout(
      this.state.currentCountdown,
      this.processNextParticipant
    );
  }
  processTimeout() {
    this.processNextParticipant();
  }
  processSkip() {
    this.processNextParticipant();
  }
  processFinish() {
    this.finishMeeting();
  }
  render() {
    return <div>
      <Countdown ref={this.countdown}
        seconds={this.state.currentCountdown}
        timeoutCallback={this.processTimeout}></Countdown>
      <ParticipantDisplay participantId={this.state.participantId}
        participantType={this.state.participantType}></ParticipantDisplay>
      <SkipButton processSkip={this.processTimeout}
        skipLabel={this.state.skipLabel}></SkipButton>
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