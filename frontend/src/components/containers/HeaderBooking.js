import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import liuLogo from '../../images/Liu-logga.png';
import TimeBooking from './TimeBooking';
import bookingActions from '../../actions/bookingActions';

const mapStateToProps = (state) => ({
    selectedClassroomName: state.bookingReducers.selectedClassroomName,
    classroomNames: state.bookingReducers.classroomNames,
    classrooms: state.bookingReducers.classrooms,
});

const mapDispatchToProps = (dispatch) => ({
    bookingActions: bindActionCreators(bookingActions, dispatch),
});

class HeaderBooking extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.classroomNames);
        console.log(this.props.selectedClassroomName);
        console.log(this.props.classroomNames.indexOf(this.props.selectedClassroomName));

        this.renderChangeClassroom = this.renderChangeClassroom.bind(this);
        this.onClickLeft = this.onClickLeft.bind(this);
        this.onClickRight = this.onClickRight.bind(this);
    }

    // When user click left arrow
    onClickLeft() {
        let indexNewClassroom = this.props.classroomNames.indexOf(this.props.selectedClassroomName) - 1;
        this.props.bookingActions.updateSelectedClassroom(this.props.classroomNames[indexNewClassroom]);
    }

    // When user click left arrow
    onClickRight() {
        let indexNewClassroom = this.props.classroomNames.indexOf(this.props.selectedClassroomName) + 1;
        this.props.bookingActions.updateSelectedClassroom(this.props.classroomNames[indexNewClassroom]);
    }

    // Render the menu to choose classroom
    renderChangeClassroom() {
        let lastIndexOfArray = (this.props.classroomNames.length - 1);

        // If first index
        if(this.props.classroomNames.indexOf(this.props.selectedClassroomName) === 0) {
            return(
                <div>
                    <span>{'  '}</span>
                    <span>{ this.props.selectedClassroomName } </span>
                    <span onClick={ this.onClickRight }>{' >'}</span>
                </div>
            );
        // If last index
        } else if (this.props.classroomNames.indexOf(this.props.selectedClassroomName) === lastIndexOfArray) {
            return (
                <div>
                    <span onClick={ this.onClickLeft }>{'<  '}</span>
                    <span>{ this.props.selectedClassroomName } </span>
                    <span>{'  '}</span>
                </div>
            );
        } else {
            return (
                <div>
                    <span onClick={ this.onClickLeft }>{'<  '}</span>
                    <span>{ this.props.selectedClassroomName } </span>
                    <span onClick={ this.onClickRight }>{'  >'}</span>
                </div>
            );
        }
    }

    render() {
        return(
            <Grid fluid>
                <Row className='HeaderBooking'>
                    <Col sm={4} style={{height: '100%'}} >
                        <img className='HeaderBookingLiuLogo' src={ liuLogo } alt='Liu logo' />
                    </Col>
                    <Col sm={4} className='ClassroomTitle'>
                        <Row>
                            { this.renderChangeClassroom() }
                        </Row>
                    </Col>
                    <Col sm={4} className='HeaderBookingColRight'>
                        <Row style={{top: '20%', right: '5%', position: 'absolute'}}>
                            <Col sm={12}>
                                <TimeBooking />
                            </Col>
                        </Row>
                        <Row style={{bottom: '20%', right: '5%', position: 'absolute'}}>
                            <Col sm={12}>
                                <span onClick={() => this.props.history.push('/')} className='HeaderBookingCancelBooking'>
                                    Avbryt bokning
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderBooking);