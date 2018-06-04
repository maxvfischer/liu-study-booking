import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import liulogo from '../../images/Liu-logga.png';
require('../../App.css');

const mapStateToProps = (state) => ({
    bookableClassrooms: state.bookingReducers.bookableClassrooms,
});

class Blipp extends Component {

    constructor(props) {
        super(props);

        this.bookableClassrooms = this.bookableClassrooms.bind(this);
    }

    bookableClassrooms() {
        let bookableClassrooms = [];

        this.props.bookableClassrooms.forEach((classroom) => {
            bookableClassrooms.push(<p style={{ margin: '0px' }} key={ classroom }> { classroom }</p>)
        });

        return(bookableClassrooms);
    }

    render() {
        return (
            <div className={'Blipp'}>
                <Grid>
                    <Row>
                        <img style={{marginTop: '50px', marginLeft: '50px'}} src={liulogo} alt='Liu logo' />
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '40px', marginBottom: '0px' }}>Singelplatsbokning</p>
                        <p style={{ fontSize: '20px', marginBottom: '0px', marginTop: '15px' }}>Bokningsbara klassrum</p>
                        {this.bookableClassrooms()}
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '40px', marginTop: '150px' }}>Blippa ditt Liu-kort</p>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default connect(mapStateToProps, null)(Blipp);