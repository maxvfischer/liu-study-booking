import React, { Component } from 'react';
import { object, bool } from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IdleTimer from 'react-idle-timer';
import bookingActions from '../../actions/bookingActions';

import HeaderBooking from './HeaderBooking';
import Classroom from './Classroom';
import BookingModal from './BookingModal';

const mapStateToProps = (state) => ({
   cardChecked: state.bookingReducers.cardChecked
});

const mapDispatchToProps = (dispatch) => ({
    bookingActions:  bindActionCreators(bookingActions, dispatch)
});


class Booking extends Component {

    constructor(props) {
        super(props);

        this.onIdle = this.onIdle.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (!(newProps.cardChecked)) {
            this.props.history.push('/');
        }
    }

    onIdle() {
        this.props.bookingActions.regretBooking();
        this.props.history.push('/');
    }

    render() {
        return (
            <IdleTimer
                ref="bookingIdleTimer"
                element={document}
                idleAction={() => { this.onIdle(); }}
                timeout={20000}>
                <BookingModal />
                <Col>
                    <Row style={{
                        margin: '0px',
                        height: '100px',
                        backgroundColor: '#f2f2f2'}}>
                        <HeaderBooking history={this.props.history} />
                    </Row>
                    <Row>
                        <Col style={{
                            display: 'flex',
                            justifyContent: 'center'}}>
                            <Classroom />
                        </Col>
                    </Row>
                </Col>

            </IdleTimer>

        );
    }
}

Booking.propTypes = {
    cardChecked: bool.isRequired,
    history: object.isRequired,
    bookingActions: object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);