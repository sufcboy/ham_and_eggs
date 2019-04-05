import React from 'react';
import ReactDOM from 'react-dom';
import SetupPage from './SetupPage';

const emptyFunction = () => {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SetupPage pigSelect={emptyFunction}
    chickenSelect={emptyFunction}
    randomSelect={emptyFunction}
    submitAction={emptyFunction}
    initialNumberOfPigs={5} />, div);
  ReactDOM.unmountComponentAtNode(div);
});