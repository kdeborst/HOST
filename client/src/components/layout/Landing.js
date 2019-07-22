/* Required Dependencies */
import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({ isAuthenticated }) => {
    
    /* Redirect To Dashboard IF ACCOUNT_VERIFIED */
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }
    
    return (
       
        <Fragment>  

            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="large text-primary">HOST®: Prepare, Share & Experience</h1>
                        <p className="lead">
                            The online social community for connecting and promoting (local) hosts 
                            that want to prepare food for pickup or organise a meal-share event at home.
                        </p>
                        <div className="buttons">
                            <Link className="btn btn-primary" to="/register">Register</Link>
                            <Link className="btn btn-primary" to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>  
    )

}

/* Setting Landing PropType Config */
Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

/* Mapping Redux State To Component */
const mapStateToProps = state => ({
    isAuthenticated: state.authorisation.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
