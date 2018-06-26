import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

const mapStateToProps = (state) => ({
    showConfirmationModal: state.bookingReducers.showConfirmationModal,
    confirmationModalMessage: state.bookingReducers.confirmationModalMessage
});

class ConfirmationActionModal extends Component {
    render() {
        return (
            <div className={(this.props.showConfirmationModal
                || this.props.showConfirmationModal)
                ? 'fadeInConfirmationModal'
                : 'fadeOutConfirmationModal'}>
                <Alert bsStyle='success'>
                    <div style={{textAlign: 'center'}}>
                        {this.props.confirmationModalMessage}
                    </div>
                </Alert>
            </div>
        );
    }
}

ConfirmationActionModal.propTypes = {
    showConfirmationModal: bool.isRequired,
    confirmationModalMessage: string.isRequired
};

export default connect(mapStateToProps, null)(ConfirmationActionModal);