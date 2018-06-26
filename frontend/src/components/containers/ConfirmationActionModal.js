import React, { Component } from 'react';
import { bool, string, number } from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    showConfirmationModal: state.bookingReducers.showConfirmationModal,
    confirmationModalMessage: state.bookingReducers.confirmationModalMessage,
    confirmationModalType: state.bookingReducers.confirmationModalType,
    confirmationModalTime: state.bookingReducers.confirmationModalTime
});

class ConfirmationActionModal extends Component {
    render() {
        const colorStrength = 600;
        const colorConfirmationModal =
            (this.props.confirmationModalType === 'success')
                ? green[colorStrength]
                : red[colorStrength];

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={ this.props.showConfirmationModal }
                autoHideDuration={this.props.confirmationModalTime - 1000}
            >
                <SnackbarContent
                    aria-describedby="client-snackbar"
                    style={{backgroundColor: colorConfirmationModal}}
                    message={
                        <span style={{display: 'flex',
                            alignItems: 'center',
                            fontSize: '15px'}}>
                                <Icon style={{marginRight: '20px'}}>
                                    check_circle
                                </Icon>
                            { this.props.confirmationModalMessage }
                            </span>
                    }
                />
            </Snackbar>
        );
    }
}

ConfirmationActionModal.propTypes = {
    showConfirmationModal: bool.isRequired,
    confirmationModalMessage: string.isRequired,
    confirmationModalType: string,
    confirmationModalTime: number.isRequired
};

export default connect(mapStateToProps, null)(ConfirmationActionModal);