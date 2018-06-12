import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import bookingActions from '../../actions/bookingActions';

import liulogo from '../../images/Liu-logga.png';
require('../../App.css');

const mapStateToProps = (state) => ({
    classroomNames: state.bookingReducers.classroomNames,
});

const mapDispatchToProps = (dispatch) => ({
    bookingActions: bindActionCreators(bookingActions, dispatch),
});


class Blipp extends Component {

    constructor(props) {
        super(props);

        this.bookableClassrooms = this.bookableClassrooms.bind(this);
    }

    componentDidMount() {
        // Listen to change in Firebase realtime database
        // When change, update bookableClassrooms in Redux store
        this.props.bookingActions.listenToBookableClassrooms();
    }

    bookableClassrooms() {
        let bookableClassrooms = [];

        for (let i = 0; i < this.props.classroomNames.length; i++) {
            bookableClassrooms.push(<p style={{ margin: '0px' }} key={ this.props.classroomNames[i] }>
                { this.props.classroomNames[i] }
                </p>)
        }

        return(bookableClassrooms);
    }

    render() {
        return (
            <div className={'Blipp'}>
                <Grid fluid>
                    <Row>
                        <Col sm={12}>
                            <img src={liulogo} alt='Liu logo' />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '40px', marginBottom: '0px' }}>Singelplatsbokning</p>
                        <p style={{ fontSize: '20px', marginBottom: '0px', marginTop: '15px' }}>Bokningsbara klassrum</p>
                        {this.bookableClassrooms()}
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <p onClick={() => this.props.history.push('/booking')} style={{ fontSize: '40px', marginTop: '150px' }}>
                            Blippa ditt Liu-kort
                        </p>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blipp);