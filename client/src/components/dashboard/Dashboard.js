/* Required Dependencies */
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAccountProfile } from '../../actions/profile';
import Loading from '../layout/Loader';
import Menu from './Menu';
import PropTypes from 'prop-types'

const Dashboard = ({ getAccountProfile, authorisation: { user }, profile: { profile, loading } }) => {

    useEffect(() => { getAccountProfile() }, []);

    return loading && profile === null ? 
        ( <Loading /> ) : 
        ( <Fragment>
            <h1 className="large text-primary">My HOST® Dashboard</h1>
            <p className="lead"><i className="fas fa-user-circle" />{' '}Hello { user && user.name }</p>
            { profile !== undefined ? 
                (<Fragment>
                    <Menu />
                </Fragment>) : 
                (<Fragment><p>You are not setup to be a HOST® Event Organiser yet.. Interested in becoming a HOST®?</p>
                    <Link to='/update-profile' className="btn btn-primary my-1">Create HOST® Member Profile</Link>
                </Fragment>
                )}
        </Fragment>
        );
}

/* Setting Dashboard PropType Config */
Dashboard.propTypes = {
    getAccountProfile: PropTypes.func.isRequired,
    authorisation: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

/* Mapping Redux State To Component */
const mapStateToProps = state => ({
    authorisation: state.authorisation,
    profile: state.profile
});

export default connect(mapStateToProps, { getAccountProfile })(Dashboard);
