import React, { Component } from 'react';
import { number, bool, string, object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import bookingActions from '../../actions/bookingActions';

import redChair from '../../images/red-chair.png';
import greenChair from '../../images/green-chair.png';

const mapStateToProps = (state) => ({
    selectedClassroomName: state.bookingReducers.selectedClassroomName
});

const mapDispatchToProps = (dispatch) => ({
    bookingActions: bindActionCreators(bookingActions, dispatch)
});

class Chair extends Component {

    constructor(props) {
        super(props);

        this.state = {
            row: this.props.row,
            col: this.props.col,
            available: this.props.available,
            seatNumber: this.props.seatNumber,
            direction: this.props.direction
        };

        this.renderSeat = this.renderSeat.bind(this);
        this.renderSeatNo = this.renderSeatNo.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        let bookingObject = {
            classroom: this.props.selectedClassroomName,
            col: this.state.col,
            row: this.state.row,
            seatNumber: this.state.seatNumber
        };

        this.props.bookingActions.studentChooseSeat(bookingObject);
    }

    componentWillReceiveProps(newProps) {
        this.setState ({
            row: newProps.row,
            col: newProps.col,
            available: newProps.available,
            seatNumber: newProps.seatNumber,
            direction: newProps.direction
        });
    }

    renderSeat() {
        if (this.state.available === false
            && this.state.direction === 'up') {
            return (
                <img
                    src={ redChair }
                    alt='Red chair up' />
            );
        } else if (this.state.available === false
            && this.state.direction === 'down') {
            return (
                <img
                    style={{transform: 'rotate(180deg)'}}
                    src={ redChair }
                    alt='Red chair down' />
            );
        } else if (this.state.available === true
            && this.state.direction === 'up') {
            return (
                <img
                    onClick={ this.onClick }
                    src={ greenChair }
                    alt='Green chair up' />
            );
        } else if (this.state.available === true
            && this.state.direction === 'down') {
            return (
                <img
                    onClick={ this.onClick }
                    style={{transform: 'rotate(180deg)'}}
                    src={ greenChair }
                    alt='Green chair down' />
            );
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
        return (
            <div
                onClick={() => {
                    return (this.state.available ? this.onClick() : null);
                }}>
                {this.renderSeat()}
                {this.renderSeatNo()}
            </div>
        );
    }
}

Chair.propTypes = {
    row: number.isRequired,
    col: number.isRequired,
    seatNumber: number.isRequired,
    available: bool.isRequired,
    direction: string.isRequired,
    bookingActions: object.isRequired,
    selectedClassroomName: string
};

export default connect(mapStateToProps, mapDispatchToProps)(Chair);