import React, { Component } from 'react';
import { object, string } from 'prop-types';
import { connect } from 'react-redux';

import ClassroomRow from './ClassroomRow';

const mapStateToProps = (state) => ({
    classrooms: state.bookingReducers.classrooms,
    selectedClassroomName: state.bookingReducers.selectedClassroomName
});

class Classroom extends Component {
    constructor(props) {
        super(props);

        this.renderClassroom = this.renderClassroom.bind(this);
    }

    renderClassroom() {

        let row = [];
        let seatNumberCounter = 1;
        let classroom =
            this.props.classrooms[this.props.selectedClassroomName]['seats'];

        for (let rowIndex in classroom) {
            if (classroom.hasOwnProperty(rowIndex)) {
                let rowOfChairs = classroom[rowIndex];
                const rowIndexParsed = parseInt(rowIndex, 0);
                row.push(
                    <ClassroomRow
                        key={ rowIndexParsed }
                        rowIndex={ rowIndexParsed }
                        chairs={ rowOfChairs }
                        seatNumberCounter={ seatNumberCounter } />
                );

                // Increase seat number counter to know
                // what seat number to render on the seats
                for (let chair in rowOfChairs) {
                    if (rowOfChairs.hasOwnProperty(chair)) {
                        const availableSeat = 1;
                        const occupiedSeat = 2;
                        const countIncrease = 1;
                        if (rowOfChairs[chair] === availableSeat
                            || rowOfChairs[chair] === occupiedSeat) {
                            seatNumberCounter += countIncrease;
                        }
                    }
                }
            }
        }

        return row;
    }

    render() {
        return (
            <div style={{float: 'none', margin: '0 auto'}}>
            { this.renderClassroom() }
            </div>
        );
    }
}

Classroom.propTypes = {
    classrooms: object,
    selectedClassroomName: string
};

export default connect(mapStateToProps, null)(Classroom);