/* Required Dependencies */
import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Experience = ({ experience }) => {
    
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.event_type}</td>
            <td>{exp.cuisine_type}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -
                {exp.to === null ? (' Currently HOST®-ing') : 
                (<Moment format='DD/MM/YYYY'>{exp.to}</Moment>)}
            </td>
            <td className="hide-sm">{exp.location}</td>
            <td><button className="btn btn-danger"><i className="fas fa-ban" /> Remove</button></td>
        </tr>
    ));
    
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Event-Type(s)</th>
                        <th>Cuisine-Type(s)</th>
                        <th className="hide-sm">Title</th>
                        <th>Timeline</th>
                        <th className="hide-sm">Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
};

/* Setting Experience Profile PropType Config */
Experience.propTypes = {
    experience: PropTypes.array.isRequired
};

export default connect()(Experience);
