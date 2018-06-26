import React, { Component } from 'react';
import { array, string, bool, object } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import bookingActions from '../../actions/bookingActions';
import CancelBookingModal from './CancelBookingModal';
import ConfirmationActionModal from './ConfirmationActionModal';

import liulogo from '../../images/Liu-logga.png';
require('../../App.css');

const mapStateToProps = (state) => ({
    classroomNames: state.bookingReducers.classroomNames,
    studentIsActive: state.bookingReducers.studentIsActive,
    cardChecked: state.bookingReducers.cardChecked,
    showConfirmationModal: state.bookingReducers.showConfirmationModal,
    confirmationModalMessage: state.bookingReducers.confirmationModalMessage
});

const mapDispatchToProps = (dispatch) => ({
    bookingActions: bindActionCreators(bookingActions, dispatch)
});


class Blipp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            open: this.props.showConfirmationModal
        };

        this.bookableClassrooms = this.bookableClassrooms.bind(this);
        this.onBlipp = this.onBlipp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentDidMount() {
        // Listen to change in Firebase realtime database
        // When change, update bookableClassrooms in Redux store
        this.props.bookingActions.listenToBookableClassrooms();
        this.props.bookingActions.listenToSettings();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.cardChecked && !(newProps.studentIsActive)) {
            this.props.history.push('/booking');
        }
    }

    bookableClassrooms() {
        let bookableClassrooms = [];

        for (let i = 0; i < this.props.classroomNames.length; i++) {
            bookableClassrooms.push(
                <p style={{ margin: '0px' }}
                   key={ this.props.classroomNames[i] }>
                    { this.props.classroomNames[i] }
                </p>
            );
        }

        return bookableClassrooms;
    }

    onBlipp(UID) {
        this.props.bookingActions.fetchUserFromFirebase(UID);
    }

    onSubmit(e) {
        this.onBlipp(this.state.value);

        e.preventDefault();
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleRequestClose() {
        this.setState({
            open: false
        });
    }

    render(){
        return (
            <div className={'Blipp'}>
                <CancelBookingModal />
                <ConfirmationActionModal />
                <Grid fluid>
                    <Row>
                        <Col sm={12}>
                            <img src={liulogo} alt='Liu logo' />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <p style={{
                            fontSize: '40px',
                            marginBottom: '0px' }}>
                            Singelplatsbokning
                        </p>
                        <p style={{
                            fontSize: '20px',
                            marginBottom: '0px',
                            marginTop: '15px' }}>
                            Bokningsbara klassrum
                        </p>
                        {this.bookableClassrooms()}
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '40px', marginTop: '150px' }}>
                            Blippa ditt Liu-kort
                        </p>
                        <form onSubmit={ this.onSubmit }>
                            <input
                                type={'text'}
                                value={ this.state.value }
                                onChange={ this.onChange } />
                        </form>
                    </Row>
                </Grid>
            </div>
        );
    }
}

Blipp.propTypes = {
    classroomNames: array.isRequired,
    studentIsActive: bool.isRequired,
    cardChecked: bool.isRequired,
    showConfirmationModal: bool.isRequired,
    confirmationModalMessage: string.isRequired,
    bookingActions: object.isRequired,
    history: object
};

export default connect(mapStateToProps, mapDispatchToProps)(Blipp);