import React, { Component } from 'react';
import { string, array, object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import liuLogo from '../../images/Liu-logga.png';
import TimeBooking from './TimeBooking';
import bookingActions from '../../actions/bookingActions';

const mapStateToProps = (state) => ({
    selectedClassroomName: state.bookingReducers.selectedClassroomName,
    classroomNames: state.bookingReducers.classroomNames,
    classrooms: state.bookingReducers.classrooms
});

const mapDispatchToProps = (dispatch) => ({
    bookingActions: bindActionCreators(bookingActions, dispatch)
});

class HeaderBooking extends Component {

    constructor(props) {
        super(props);

        this.renderChangeClassroom = this.renderChangeClassroom.bind(this);
        this.onClickLeft = this.onClickLeft.bind(this);
        this.onClickRight = this.onClickRight.bind(this);
        this.onClickRegretBooking = this.onClickRegretBooking.bind(this);
    }

    // When user click left arrow
    onClickLeft() {
        const subtractFromIndex = 1;
        let indexNewClassroom =
            this.props.classroomNames
                .indexOf(this.props.selectedClassroomName) - subtractFromIndex;
        this.props.bookingActions
            .updateSelectedClassroom(
                this.props.classroomNames[indexNewClassroom]);
    }

    // When user click left arrow
    onClickRight() {
        const addToIndex = 1;
        let indexNewClassroom =
            this.props.classroomNames
                .indexOf(this.props.selectedClassroomName) + addToIndex;
        this.props.bookingActions
            .updateSelectedClassroom(
                this.props.classroomNames[indexNewClassroom]);
    }

    onClickRegretBooking() {
        this.props.bookingActions.regretBooking();
        this.props.history.push('/');
    }

    // Render the menu to choose classroom
    renderChangeClassroom() {
        const subtractFromLength = 1;
        const ifOnlyOneClassroom = 1;
        const firstClassroomIndex = 0;
        let lastIndexOfArray =
            (this.props.classroomNames.length - subtractFromLength);

        // Only one classroom
        if (this.props.classroomNames.length === ifOnlyOneClassroom) {
            return (
                <div>
                    <Col sm={4}>
                        <span>{'  '}</span>
                    </Col>
                    <Col sm={4}>
                        <span>{ this.props.selectedClassroomName } </span>
                    </Col>
                    <Col sm={4}>
                        <span>{' '}</span>
                    </Col>
                </div>
            );

        // First index
        } else if (this.props.classroomNames
                .indexOf(this.props.selectedClassroomName) ===
            firstClassroomIndex) {
            return (
                <div>
                    <Col sm={4}>
                        <span>
                            {'  '}
                        </span>
                    </Col>
                    <Col sm={4}>
                        <span>
                            { this.props.selectedClassroomName }
                        </span>
                    </Col>
                    <Col sm={4}>
                        <span
                            style={{float: 'left'}}
                            onClick={ this.onClickRight }>
                            {' >'}
                        </span>
                    </Col>
                </div>
            );

        // If last index
        } else if (this.props.classroomNames
                .indexOf(this.props.selectedClassroomName) ===
                lastIndexOfArray) {
            return (
                <div>
                    <Col sm={4}>
                        <span
                            style={{float: 'right'}}
                            onClick={ this.onClickLeft }>
                            {'<  '}
                        </span>
                    </Col>
                    <Col sm={4}>
                        <span>
                            { this.props.selectedClassroomName }
                        </span>
                    </Col>
                    <Col sm={4}>
                        <span>
                            {'  '}
                        </span>
                    </Col>
                </div>
            );

        // Classrooms in middle of list
        } else {
            return (
                <div>
                    <Col sm={4}>
                        <span
                            style={{float: 'right'}}
                            onClick={ this.onClickLeft }>
                            {'<  '}
                        </span>
                    </Col>
                    <Col sm={4}>
                        <span>
                            { this.props.selectedClassroomName }
                        </span>
                    </Col>
                    <Col sm={4}>
                        <span
                            style={{float: 'left'}}
                            onClick={ this.onClickRight }>
                            {'  >'}
                        </span>
                    </Col>
                </div>
            );
        }
    }

    render(){
        return (
            <Grid fluid>
                <Row className='HeaderBooking'>
                    <Col sm={4} style={{height: '100%'}} >
                        <img className='HeaderBookingLiuLogo'
                             src={ liuLogo }
                             alt='Liu logo'
                             onClick={() => this.onClickRegretBooking()} />
                    </Col>
                    <Col sm={4} className='ClassroomTitle'>
                        <Row>
                            { this.renderChangeClassroom() }
                        </Row>
                    </Col>
                    <Col sm={4} className='HeaderBookingColRight'>
                        <Row style={{
                            top: '20%',
                            right: '5%',
                            position: 'absolute'}}>
                            <Col sm={12}>
                                <TimeBooking />
                            </Col>
                        </Row>
                        <Row style={{
                            bottom: '20%',
                            right: '5%',
                            position: 'absolute'}}>
                            <Col sm={12}>
                                <span
                                    onClick={
                                        () => { this.onClickRegretBooking(); }
                                    }
                                    className='HeaderBookingCancelBooking'>
                                    Avbryt bokning
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

HeaderBooking.propTypes = {
    selectedClassroomName: string,
    classroomNames: array.isRequired,
    classrooms: object,
    bookingActions: object.isRequired,
    history: object
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBooking);