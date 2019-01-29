import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
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
        this.finishMeeting = this.finishMeeting.bind(this);
    };

    pigSelect(number) {
        if (number !== -1) {
            this.formVariables.numberOfPigs = parseInt(number, 10);
        }
    }

    chickenSelect(number) {
        this.formVariables.numberOfChickens = parseInt(number, 10);
    }

    randomSelect(value) {
        this.formVariables.random = value;
    }

    startUp() {
        this.setState(prevState => ({
            currentView: 'setUp'
        }))
    };

    finishMeeting() {
        this.formVariables = {
            numberOfPigs: 6,
            numberOfChickens: 0,
            random: false
        };

        this.setState(prevState => ({
            currentView: 'home'
        }))
    }

    submitAction() {
        // console.log(this.formVariables);
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
                random={this.formVariables.random}
                finishCallback={this.finishMeeting}>
                </TimerPage>;
        } else {
            view = <HomePage getStarted={this.startUp}></HomePage>;
        }

        return (
            <div className="App">
                {view}
            </div>
        );
    };
}

export default App;
