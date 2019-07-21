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
            <li><a href='#!' onClick={ logout }><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></a></li>
        </ul>
    );

    /* Initialisation of hyperlinks for public && VERIFIED_ACCOUNT */
    const publicLinks = (
        <ul>
            <li><Link to="/community"><i className="fas fa-utensils"></i> HOST® Community</Link></li>
            <li><Link to="/about"><i className="fas fa-info"></i> Become a HOST®</Link></li>
            <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
            <li><Link to="/register"><i className="far fa-registered"></i> Register</Link></li>
        </ul>
    );

    return (
        
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">HOST®</Link>
            </h1>
            { !loading && <Fragment>{ isAuthenticated ? accountLinks : publicLinks }</Fragment> }
        </nav>
        
    )

}

/* Setting Navigation PropType Config */
Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthorised: PropTypes.object.isRequired,
};

/* Mapping Redux State To Component */
const mapStateToProps = state => ({
    isAuthorised: state.authorisation
});

export default connect(mapStateToProps, { logout })(Navigation);
