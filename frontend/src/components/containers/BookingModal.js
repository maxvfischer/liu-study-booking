import React, { Component } from 'react';
import { object, number, string, bool } from 'prop-types';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import bookingActions from '../../actions/bookingActions';

const mapStateToProps = (state) => ({
    bookingObject: state.bookingReducers.bookingObject,
    UID: state.bookingReducers.UID,
    showBookingDecisionModal: state.bookingReducers.showBookingDecisionModal,
    bookingInterval: state.bookingReducers.bookingInterval
});

const mapDispatchToProps = (dispatch) => ({
    bookingActions: bindActionCreators(bookingActions, dispatch)
});

class BookingModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTime: null
        };

        this.handleClose = this.handleClose.bind(this);
        this.renderModalBody = this.renderModalBody.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
    }

    handleBooking() {

        let bookingObject = this.props.bookingObject;
        bookingObject['startTime'] = moment().valueOf();
        bookingObject['UID'] = this.props.UID;

        this.props.bookingActions.studentBookSeat(bookingObject);
    }

    handleClose() {
        this.props.bookingActions.closeBookingModal();
    }

    renderModalBody() {
        if (this.props.bookingObject) {
            const currentTime = moment().format('HH:mm');
            const bookingInterval = this.props.bookingInterval;
            const endTime = moment()
                .add(bookingInterval, 'milliseconds')
                .format('HH:mm');
            return (
                <ul>
                    <li>Klassrum: { this.props.bookingObject['classroom'] }</li>
                    <li>Plats: { this.props.bookingObject['seatNumber'] }</li>
                    <li>Tid: { currentTime } - { endTime } </li>
                </ul>
            );
        }
    }

    render() {
        return (
            <Modal
                dialogClassName="InfoModal"
                show={ this.props.showBookingDecisionModal }
                onHide={ this.handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Bokning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> Vill du göra följande bokning? </p>
                    { this.renderModalBody() }
                    <div style={{textAlign: 'center'}}>
                        <Button
                            style={{marginRight: '10px', marginTop: '10px'}}
                            bsStyle="default"
                            onClick={() => this.handleClose() }>
                            Avbryt
                        </Button>
                        <Button
                            style={{marginLeft: '10px', marginTop: '10px'}}
                            bsStyle="primary"
                            onClick={() => this.handleBooking() }>
                            Boka
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

BookingModal.propTypes = {
    bookingObject: object,
    UID: string,
    showBookingDecisionModal: bool.isRequired,
    bookingInterval: number.isRequired,
    bookingActions: object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);