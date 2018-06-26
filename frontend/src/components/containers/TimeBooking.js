import React, { Component } from 'react';
import moment from 'moment';

class TimeBooking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTime: null,
            intervalId: 0
        };
    }

    componentDidMount() {
        const clockInterval = 1000;
        let intervalId = setInterval(() => {
            this.setState({
                currentTime: moment().format('HH:mm')
            });
        }, clockInterval);

        this.setState({
            intervalId: intervalId
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render(){
        return (
            <span
                style={{fontSize: '20px', fontFamily: 'Arial'}}>
                { this.state.currentTime }
            </span>
        );
    }
}

export default TimeBooking;