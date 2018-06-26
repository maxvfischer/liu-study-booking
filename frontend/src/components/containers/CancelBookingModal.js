import React, { Component } from 'react';
import { bool, object, number, string } from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import bookingActions from '../../actions/bookingActions';

const mapStateToProps = (state) => ({
    showCancelBookingModal: state.bookingReducers.showCancelBookingModal,
    studentBookedSeat: state.bookingReducers.studentBookedSeat,
    bookingInterval: state.bookingReducers.bookingInterval,
    UID: state.bookingReducers.UID,
    confirmationModalTime: state.bookingReducers.confirmationModalTime
});

const mapDispatchToProps = (dispatch) => ({
    bookingActions:  bindActionCreators(bookingActions, dispatch)
});

class CancelBookingModal extends Component {

    constructor(props) {
        super(props);

        this.renderModalBody = this.renderModalBody.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCancelBooking = this.handleCancelBooking.bind(this);
    }

    handleClose() {
        this.props.bookingActions.regretCancelBooking();
    }

    handleCancelBooking() {
        this.props.bookingActions.cancelBooking(
            this.props.studentBookedSeat,
            this.props.UID,
            this.props.confirmationModalTime
        );
    }

    renderModalBody() {
        if (this.props.studentBookedSeat) {
            const startTime = moment(this.props.studentBookedSeat['startTime']);
            const bookingInterval = this.props.bookingInterval;
            const classroom = 'Klassrum: ' +
                this.props.studentBookedSeat['classroom'];
            const seatNumber = 'Plats: ' +
                this.props.studentBookedSeat['seatNumber'];
            const timeInterval = 'Tid: ' +
                startTime.format('HH:mm') +
                ' - ' +
                startTime.add(bookingInterval, 'ms').format('HH:mm');
            return (
                <ul>
                    <li>
                        { classroom }
                    </li>
                    <li>
                        { seatNumber }
                    </li>
                    <li>
                        { timeInterval }
                    </li>
                </ul>
            );
        }
    }

    render() {
        return (
            <Modal
                dialogClassName="InfoModal"
                show={ this.props.showCancelBookingModal }
                onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Avboka plats
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Vill du avboka din plats?</p>
                    { this.renderModalBody() }
                    <div style={{textAlign: 'center'}}>
                        <Button
                            style={{marginRight: '10px', marginTop: '10px'}}
                            bsStyle="default"
                            onClick={() => { this.handleClose(); }}>
                            Avbryt
                        </Button>
                        <Button
                            style={{marginLeft: '10px', marginTop: '10px'}}
                            bsStyle="primary"
                            onClick={() => { this.handleCancelBooking(); }}>
                            Avboka
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

CancelBookingModal.propTypes = {
    showCancelBookingModal: bool.isRequired,
    studentBookedSeat: object,
    bookingInterval: number.isRequired,
    UID: string,
    bookingActions: object.isRequired,
    confirmationModalTime: number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelBookingModal);