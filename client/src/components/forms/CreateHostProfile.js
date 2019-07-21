/* Required Dependencies */
import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


const CreateHostProfile = props => {
    
    /* Defining profileData Initial State */
    const [profileData, setProfileData] = useState({
        location: '',
        status: '',
        skills: '',
        bio: '',
        website: '',
        experience: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        pinterest: ''
    });

    const [addSocialNetworks, toggleSocialInputs] = useState(false);

    /* Destructure(d) Data */
    const {
        location,
        status,
        skills,
        bio,
        website,
        experience,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
        pinterest
    } = profileData;

    /* Action Functions */
    const onChange = e => setProfileData({ ...profileData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            
            {/* Profile Header */}
            <h1 className="large text-primary">Create a HOST® Membership Profile</h1>
            <p className="lead"><i className="far fa-address-card"></i> Please tell us something about yourself</p>
            <small>* = Required Field</small>
            
            {/* Profile Form */}
            <form className="form">
                
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}></input>
                    <small>In which city do you live?</small>
                </div>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select your desired status</option>
                        <option value="Member">HOST® Member</option>
                        <option value="Takeway">HOST® (TakeAway) Visitor</option>
                    </select>
                    <small>What HOST® Status are you applying for?</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)}></input>
                    <small>Please give us an idea of your skills, like this: Full-English-Breakfast,Theme-Parties,...</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="Please tell us something about yourself.. What motivates you to become a HOST® member?" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                </div>
                
                {/* Toggle Button [View/Hide] Social Media Input Fields */}
                <div className="my-2">
                    <button type="button" className="btn btn-light" onClick={() => toggleSocialInputs(!addSocialNetworks)}>Add Social Networks to your HOST® Account</button>
                    <span>* optional</span>
                </div>

                {/* Result Of Toggling addSocialNetwork Button */}
                { addSocialNetworks && 
                    <Fragment>
                        
                        {/* Social Media Input Fields (URL) */}
                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)}></input>
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}></input>
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}></input>
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={e => onChange(e)}></input>
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}></input>
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-pinterest fa-2x"></i>
                            <input type="text" placeholder="Pinterest URL" name="pinterest" value={pinterest} onChange={e => onChange(e)}></input>
                        </div>

                    </Fragment>
                }

                <input type="submit" className="btn btn-primary my-1"></input>
                <a className="btn btn-light my-1" href="/dashboard">Go Back</a>

            </form>

        </Fragment>
    )
}


CreateHostProfile.propTypes = {

}

export default CreateHostProfile
