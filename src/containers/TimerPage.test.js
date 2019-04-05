import React from 'react';
import ReactDOM from 'react-dom';
import TimerPage from './TimerPage';

const finishLabel = 'Finish meeting';
const skipLabel = 'Skip';
const emptyFunction = () => {};
let div;
let wrapper;

beforeAll(() => {
  div = document.createElement('div');
  wrapper = ReactDOM.render(<TimerPage numberOfPigs={10}
    numberOfChickens={6}
    random={true}
    finishCallback={emptyFunction} />, div);
});

afterAll(() => {
  ReactDOM.unmountComponentAtNode(div);
});

const getFilledArray = function(fillNumber) {
  const filledArray = [];

  for (let i = 1; i <= fillNumber; i++) {
    filledArray.push(i);
  }

  return filledArray;
}

it('correctly calculates the seconds per participant', () => {
  const secondsPerParticipantTests = [
    {"pigs": 10, "chickens": 3, "expected": 39},
    {"pigs": 5, "chickens": 5, "expected": 60}
  ];

  secondsPerParticipantTests.forEach((test) => {
    const secondsPerParticipant = wrapper.getSecondsPerParticipant(test.pigs, test.chickens);
    expect(secondsPerParticipant).toBe(test.expected);
  });
})

it('shuffles the given array correctly', () => {
  const testArray = [1, 2, 3, 4, 5];
  const randomArray = wrapper.shuffle(testArray);

  // Check the length
  expect(randomArray.length).toBe(5);

  // Check each of items exist
  testArray.forEach((value) => {
    expect(randomArray.includes(value)).toBe(true);
  });
})

it('should return correct label for number of pigs and chickens', () => {
  const labelTests = [
    {chickens: [], pigs: [1], expected: finishLabel},
    {chickens: [1], pigs: [1], expected: finishLabel},
    {chickens: [1], pigs: [], expected: finishLabel},
    {chickens: [1], pigs: [1,2], expected: skipLabel},
    {chickens: [1,2], pigs: [1], expected: skipLabel},
  ];

  labelTests.forEach((test) => {
    expect(wrapper.getSkipLabel(test.pigs, test.chickens)).toBe(test.expected);
  });
})

it('should initialise the pigs and chickens correctly', () => {
  const initialiseTest = [
    {
      numberOfChickens: 1,
      numberOfPigs: 2,
      random: true
    },
    {
      numberOfChickens: 3,
      numberOfPigs: 6,
      random: false
    }
  ];

  initialiseTest.forEach((test) => {
    wrapper.setState({
      numberOfPigs: test.numberOfPigs,
      numberOfChickens: test.numberOfChickens,
      random: test.random
    });

    wrapper.initialisePigsAndChickens();
    const currentState = wrapper.state;

    // Check the count
    if (test.random) {
      expect(currentState.pigs.length).toBe(test.numberOfPigs);
      expect(currentState.chickens.length).toBe(test.numberOfChickens);
    } else {
      expect(currentState.pigs).toEqual(getFilledArray(test.numberOfPigs));
      expect(currentState.chickens).toEqual(getFilledArray(test.numberOfChickens));
    }

    expect(currentState.participantId).toBe(currentState.pigs[0]);
  })
})

it('should move on to the next pig when called', () => {
  const initialState = {
    pigs: [1,2,3,4,5,6,7]
  };
  const expectedPigs = [2,3,4,5,6,7];
  wrapper.setState(initialState);
  wrapper.processNextParticipant();
  let expected = wrapper.state;

  expect(expected.pigs).toEqual(expectedPigs);
  expect(expected.participantId).toBe(expectedPigs[0]);
  expect(expected.participantType).toBe(wrapper.typePig);
  expect(expected.currentCountdown).toBe(expected.timePerParticipant * wrapper.pigsPrecedence);
})

it('should move on to the next chicken but not shift it', () => {
  const initialState = {
    participantId: 1,
    participantType: wrapper.typePig,
    pigs: [],
    chickens: [1,2]
  };
  const expectedChickens = [1,2];
  wrapper.setState(initialState);
  wrapper.processNextParticipant();
  let expected = wrapper.state;

  expect(expected.chickens).toEqual(expectedChickens);
  expect(expected.participantId).toBe(expectedChickens[0]);
  expect(expected.participantType).toBe(wrapper.typeChicken);
  expect(expected.currentCountdown).toBe(
    expected.timePerParticipant * wrapper.chickenPrecedence
  );
})

it('should move on to the next chicken and shift it', () => {
  const initialState = {
    participantId: 2,
    participantType: wrapper.typeChicken,
    pigs: [],
    chickens: [2,3]
  };
  const expectedChickens = [3];
  wrapper.setState(initialState);
  wrapper.processNextParticipant();
  let expected = wrapper.state;

  expect(expected.chickens).toEqual(expectedChickens);
  expect(expected.participantId).toBe(expectedChickens[0]);
  expect(expected.participantType).toBe(wrapper.typeChicken);
  expect(expected.currentCountdown).toBe(
    expected.timePerParticipant * wrapper.chickenPrecedence
  );
})