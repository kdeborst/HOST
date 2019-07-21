/* Required Dependencies */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

/* Private Route Function */
const PrivateRoute = ({ component: Component, authorisation: { isAuthenticated, loading }, ...rest }) => (
    <Route { ...rest } render={props => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component { ...props } />)} />
);

/* Setting Private Route PropType Config */
PrivateRoute.propTypes = {
    authorisation: PropTypes.object.isRequired
}

/* Mapping Redux State To Component */
const mapStateToProps = state => ({
    authorisation: state.authorisation
});

export default connect(mapStateToProps)(PrivateRoute);
