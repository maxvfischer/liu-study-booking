import React, { Component } from 'react';

import redChair from '../../images/red-chair.png';
import greenChair from '../../images/green-chair.png';

class Chair extends Component {

    constructor(props) {
        super(props);

        this.state = {
            row: this.props.row,
            col: this.props.col,
            color: this.props.color,
            seatNumber: this.props.seatNumber,
            direction: this.props.direction,
        };

        this.renderSeat = this.renderSeat.bind(this);
        this.renderSeatNo = this.renderSeatNo.bind(this);
    }

    renderSeat() {
        if (this.state.color === 'red' && this.state.direction === 'up') {
            return (<img src={ redChair } alt='Red chair up' />);
        } else if (this.state.color === 'red' && this.state.direction === 'down') {
            return (<img style={{transform: 'rotate(180deg)'}} src={ redChair } alt='Red chair down' />);
        } else if (this.state.color === 'green' && this.state.direction === 'up') {
            return (<img src={ greenChair } alt='Green chair up' />);
        } else if (this.state.color === 'green' && this.state.direction === 'down') {
            return (<img style={{transform: 'rotate(180deg)'}} src={ greenChair } alt='Green chair down' />);
        }
    }

    renderSeatNo() {
        if (this.state.direction === 'up') {
            return (
                <div className='SeatNoUp'>
                    <span>{ this.state.seatNumber }</span>
                </div>
            );
        } else if (this.state.direction === 'down') {
            return (
                <div className='SeatNoDown'>
                    <span>{ this.state.seatNumber }</span>
                </div>
            );
        }
    }

    render() {
        return(
            <div className='Chair'>
                {this.renderSeat()}
                {this.renderSeatNo()}
            </div>
        );
    }
}

export default Chair;