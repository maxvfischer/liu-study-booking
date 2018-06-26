import React, { Component } from 'react';
import { bool, object } from 'prop-types';
import { connect } from 'react-redux';
import Booking from './Booking';

const mapStateToProps = (state) => ({
    cardChecked: state.bookingReducers.cardChecked
});

class RequireBlipp extends Component {

    constructor(props) {
        super(props);
        this.checkBlipp = this.checkBlipp.bind(this);
    }

    componentWillMount() {
        this.checkBlipp();
    }

    checkBlipp() {
        if (!(this.props.cardChecked)) {
            this.props.history.push('/');
        }
    }

    render(){
        return this.props.cardChecked
        ? <Booking history={ this.props.history } />
        : null;
    }
}

RequireBlipp.propTypes = {
    cardChecked: bool.isRequired,
    history: object.isRequired
};

export default connect(mapStateToProps, null)(RequireBlipp);