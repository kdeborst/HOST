/* Required Dependencies */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authorisation';
import PropTypes from 'prop-types';

const Navigation = ({ isAuthorised: { isAuthenticated, loading }, logout }) => {
    
    /* Initialisation of (exclusive) hyperlinks for VERIFIED_ACCOUNT */
    const accountLinks = (
        <ul>
            <li><Link to="/dashboard"><i className="fas fa-user-circle" />{' '}<span className="hide-sm">My Account</span></Link></li>
            <li><Link to='#!' onClick={ logout }><i className="fas fa-sign-out-alt" />{' '}<span className="hide-sm">Logout</span></Link></li>
        </ul>
    );

    /* Initialisation of hyperlinks for public && VERIFIED_ACCOUNT */
    const publicLinks = (
        <ul>
            <li><Link to="/about"><i className="fas fa-info-circle" />{' '}About HOST®</Link></li>
            <li><Link to="/login"><i className="fas fa-sign-in-alt" />{' '}Login</Link></li>
            <li><Link to="/register"><i className="far fa-registered" />{' '}Register</Link></li>
        </ul>
    );

    /* Defining the type of Navigation to return */
    return (
        <nav className="navbar bg-dark">
            <h1><Link to="/"><i className="far fa-lemon"></i>{' '}HOST<small>®</small></Link></h1>
            { !loading && <Fragment>{ isAuthenticated ? accountLinks : publicLinks }</Fragment> }
        </nav>
    )

}

/* Setting Navigation PropType Config */
Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthorised: PropTypes.object.isRequired
};

/* Mapping Redux State To Component */
const mapStateToProps = state => ({
    isAuthorised: state.authorisation
});

export default connect(mapStateToProps, { logout })(Navigation);
