import React, { Component } from 'react';
import './App.css';
import HomePage from './containers/HomePage';
import SetupPage from './containers/SetupPage';
import TimerPage from './containers/TimerPage';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentView: 'home',
        };
        this.formVariables = {
            numberOfPigs: 6,
            numberOfChickens: 0,
            random: false
        };
        this.startUp = this.startUp.bind(this);
        this.submitAction = this.submitAction.bind(this);
        this.pigSelect = this.pigSelect.bind(this);
        this.chickenSelect = this.chickenSelect.bind(this);
        this.randomSelect = this.randomSelect.bind(this);
    };

    pigSelect(number) {
        if (number !== -1) {
            this.formVariables.numberOfPigs = number;
        }
    }

    chickenSelect(number) {
        this.formVariables.numberOfChickens = number;
    }

    randomSelect(value) {
        this.formVariables.random = value;
    }

    startUp() {
        this.setState(prevState => ({
            currentView: 'setUp'
        }))
    };

    submitAction() {
        console.log(this.formVariables);
        this.setState(prevState => ({
            currentView: 'time'
        }))
    };

    render() {
        let view;

        if (this.state.currentView === 'setUp') {
            view = <SetupPage pigSelect={this.pigSelect}
                chickenSelect={this.chickenSelect}
                randomSelect={this.randomSelect}
                submitAction={this.submitAction}>
                </SetupPage>;
        } else if (this.state.currentView === 'time') {
            view = <TimerPage numberOfPigs={this.formVariables.numberOfPigs}
                numberOfChickens={this.formVariables.numberOfChickens}
                random={this.formVariables.random}>
                </TimerPage>;
        } else {
            view = <HomePage getStarted={this.startUp}></HomePage>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Welcome to Ham and Eggs</h1>
                </header>
                {view}
            </div>
        );
    };
}

export default App;
