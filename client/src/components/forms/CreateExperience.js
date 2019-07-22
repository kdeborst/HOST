/* Required Dependencies */
import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createExperience } from '../../actions/profile';
import PropTypes from 'prop-types';

const CreateExperience = ({ createExperience, history }) => {

    /* Defining Initial State */
    const [experienceData, setExperienceData] = useState({
        event_type: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        cuisine_type: '',
        description: ''
    });

    /* Remove 'To'-Date State on Current Experience: true*/
    const [toDateDisabled, toggleDisabled] = useState(false);

    /* Destructure(d) Data */
    const {
        event_type,
        title,
        location,
        from,
        to,
        current,
        cuisine_type,
        description,
    } = experienceData;

    /* State Action Functions */
    const onChange = e => setExperienceData({ ...experienceData, [e.target.name]: e.target.value });

    return (
        <Fragment>

            {/* Container Header */}
            <h1 className="large text-primary">Add An Experience</h1>
            <p><i className="far fa-share-square" /> Please tell us more about your HOST® Experience</p>
            <small>* = Required Field</small>

            {/* Experience Form */}
            <form className="form" onSubmit={e => {e.preventDefault(); createExperience(experienceData, history)}}>
                <div className="form-group">
                    <input type="text" placeholder="Experience Title *" name="title" value={title} required onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location *" name="location" value={location} required onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <select name="cuisine_type" value={cuisine_type} onChange={e => onChange(e)} >
                        <option value="0">* Select your event type</option>
                        <option value="Street-Food">Regional Street Food</option>
                        <option value="Vegetarian">Vegetarian Cuisine</option>
                        <option value="Vegan">Vegan Cuisine</option>
                        <option value="Fusion">Fusion Cuisine</option>
                        <option value="Chinese">Chinese Cuisine</option>
                        <option value="Mexican">Mexican Cuisine</option>
                        <option value="Italian">Italian Cuisine</option>
                        <option value="Japanese">Japanese Cuisine</option>
                        <option value="Greek">Greek Cuisine</option>
                        <option value="French">French Cuisine</option>
                        <option value="Thai">Thai Cuisine</option>
                        <option value="Spanish">Spanish Cuisine</option>
                        <option value="Indian">Indian Cuisine</option>
                        <option value="Haute-Cuisine">Haute Cuisine</option>
                    </select>
                    <small>What kind of meal-share event did you attend?</small>
                </div>
                <div className="form-group">
                    <select name="event_type" value={event_type} onChange={e => onChange(e)}>
                        <option value="0">* Select your event type</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Bunch">Brunch</option>
                        <option value="Lunch">Lunch</option>
                        <option value="High-Tea">High-Tea</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Event">Other Event</option>
                    </select>
                    <small>What kind of meal-share event did you attend?</small>
                </div>
                <div className="form-group">
                    <h4><i className="far fa-calendar-alt"/> Date From</h4>
                    <input type="datetime-local" name="from" value={from} required onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} checked={current} onChange={e => 
                        {setExperienceData({ ...experienceData, current: !current }); toggleDisabled(!toDateDisabled);}} />
                        {' '}Current
                    </p>
                </div>
                <div className="form-group">
                    <h4><i className="far fa-calendar-alt" /> Date To</h4>
                    <input type="datetime-local" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div>
                    <textarea name="description" cols="30" rows="5" placeholder="Experience Description" value={description} onChange={e => onChange(e)} />
                </div>
                <input className="btn btn-primary my-1" type="submit" />
                <Link className="btn btn-light my-1" to="/dashboard"><i className="fas fa-arrow-circle-left" /> Back</Link>
            </form>

        </Fragment>
    )
}

/* Setting Create Host Profile PropType Config */
CreateExperience.propTypes = {
    createExperience: PropTypes.func.isRequired
};

export default connect(null, { createExperience })(CreateExperience);
