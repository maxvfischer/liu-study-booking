import React, { Component } from 'react';

var moment = require('moment');

class TimeBooking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTime: null,
            intervalId: null,
        }
    }

    componentDidMount() {
        let intervalId = setInterval(() => {
            this.setState({
                currentTime: moment().format('HH:mm'),
            })
        }, 1000);

        this.setState({
            intervalId: intervalId,
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        return(
            <span style={{fontSize: '20px', fontFamily: 'Arial'}}>{ this.state.currentTime }</span>
        );
    }
}
export default TimeBooking;