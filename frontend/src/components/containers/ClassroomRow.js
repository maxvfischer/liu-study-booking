import React, { Component } from 'react';
import { array, number } from 'prop-types';
import Chair from './Chair';

class ClassroomRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chairs: this.props.chairs,
            rowIndex: this.props.rowIndex,
            seatNumberCounter: this.props.seatNumberCounter
        };
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            chairs: newProps.chairs,
            rowIndex: newProps.rowIndex,
            seatNumberCounter: newProps.seatNumberCounter
        });
    }

    renderRow() {

        let seatNumberCounter = this.props.seatNumberCounter;
        let seats = [];
        const firstRow = 0;
        let direction = parseInt(this.state.rowIndex, 0) === firstRow
            ? 'down'
            : 'up';

        for (let chairIndex in this.state.chairs) {
            if (this.state.chairs.hasOwnProperty(chairIndex)) {
                const key = [this.state.rowIndex,
                    chairIndex,
                    seatNumberCounter];
                const chairIndexParsed = parseInt(chairIndex, 0);
                const availableSeat = 1;
                const occupiedSeat = 2;
                const countIncrease = 1;

                // Available seat
                if (this.state.chairs[chairIndex] === availableSeat) {
                    seats.push(
                        <div className='Chair'>
                            <Chair
                                key={ key }
                                row={ this.state.rowIndex }
                                col={ chairIndexParsed }
                                available={ true }
                                direction={ direction }
                                seatNumber={ seatNumberCounter } />
                        </div>
                    );

                    seatNumberCounter += countIncrease;

                // Not available seat
                } else if (this.state.chairs[chairIndex] === occupiedSeat) {
                    seats.push(
                        <div className='Chair'>
                            <Chair
                                key={ key }
                                row={ this.state.rowIndex }
                                col={ chairIndexParsed }
                                available={ false }
                                direction={ direction }
                                seatNumber={ seatNumberCounter } />
                        </div>
                    );

                    seatNumberCounter += countIncrease;

                // No seat
                } else {
                    seats.push(
                        <div className='Chair' />
                    );
                }
            }
        }
        return (seats);
    }

    render() {
        return (
            <div style={{overflow: 'hidden'}}>
                { this.renderRow() }
            </div>
        );
    }
}

ClassroomRow.propTypes = {
    chairs: array.isRequired,
    rowIndex: number.isRequired,
    seatNumberCounter: number.isRequired
};

export default ClassroomRow;