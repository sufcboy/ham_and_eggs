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

it('should process next participant correctly', () => {
  const tests = [
    // Pigs is moved on
    {
      state: {
        chickens: [],
        pigs: [1,2,3,4,5,6,7]
      },
      expected: {
        chickens: [],
        pigs: [2,3,4,5,6,7],
        participantId: 2,
        participantType: wrapper.typePig,
        currentCountdown: wrapper.state.timePerParticipant*wrapper.pigsPrecedence
      }
    },
    // Last pig moves onto chickens
    {
      state: {
        participantId: 1,
        participantType: wrapper.typePig,
        pigs: [],
        chickens: [1,2]
      },
      expected: {
        chickens: [1,2],
        pigs: [],
        participantId: 1,
        participantType: wrapper.typeChicken,
        currentCountdown: wrapper.state.timePerParticipant*wrapper.chickenPrecedence
      }
    },
    // Next chicken is processed
    {
      state: {
        participantId: 2,
        participantType: wrapper.typeChicken,
        pigs: [],
        chickens: [2,3]
      },
      expected: {
        chickens: [3],
        pigs: [],
        participantId: 3,
        participantType: wrapper.typeChicken,
        currentCountdown: wrapper.state.timePerParticipant*wrapper.chickenPrecedence
      }
    },
  ];

  tests.forEach((test) => {
    wrapper.setState(test.state);

    // Mock the countdown timeout
    const mockTimeout = jest.fn();
    wrapper.countdown.current.countdownTimeout = mockTimeout;

    // Test method
    wrapper.processNextParticipant();
    let result = wrapper.state;

    // Mocked method
    expect(mockTimeout.mock.calls[0][0]).toBe(result.currentCountdown);
    expect(mockTimeout.mock.calls[0][1]).toBe(wrapper.processNextParticipant);

    // Check other expectations
    expect(result.pigs).toEqual(test.expected.pigs);
    expect(result.chickens).toEqual(test.expected.chickens);
    expect(result.participantId).toBe(test.expected.participantId);
    expect(result.participantType).toBe(test.expected.participantType);
    expect(result.currentCountdown).toBe(test.expected.currentCountdown);
  });
})

it('should clear timeout and process final method', () => {
  wrapper.setState({
    pigs: [],
    chickens: []
  });
  const mockTimeout = jest.fn();
  wrapper.countdown.current.clearTimeoutInterval = mockTimeout;

  // Test method
  wrapper.processNextParticipant();

  expect(mockTimeout.mock.calls.length).toBe(1);
})
