import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import HeaderBooking from './HeaderBooking';
import Chair from './Chair';

class Booking extends Component {
    render() {
        return(
            <Row style={{margin: '0px', height: '100px', backgroundColor: '#f2f2f2'}}>
                <HeaderBooking history={this.props.history} />
                <Chair row={1} col={1} seatNumber={1} color={'red'} direction={'down'} />
            </Row>
        );
    }
}

export default connect(null, null)(Booking);