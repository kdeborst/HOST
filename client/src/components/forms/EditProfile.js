/* Required Dependencies */
import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { upgradeAccount, getAccountProfile } from '../../actions/profile';
import PropTypes from 'prop-types';


const EditProfile = ({ profile: { profile, loading }, upgradeAccount, getAccountProfile, history }) => {
    
    /* Defining profileData Initial State */
    const [profileData, setProfileData] = useState({
        location: '',
        status: '',
        skills: '',
        bio: '',
        website: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        pinterest: ''
    });

    const [addSocialNetworks, toggleSocialInputs] = useState(false);

    /* Bugs upon sending the edited profileData */
    useEffect(() => {
        getAccountProfile();
        setProfileData({
            location: (loading || !profile.location ? '' : profile.location),
            status: (loading || !profile.status ? '' : profile.status),
            skills: (loading || !profile.skills ? '' : profile.skills.join(',')),
            bio: (loading || !profile.bio ? '' : profile.bio),
            website: (loading || !profile.website ? '' : profile.website),
            youtube: (loading || !profile.social ? '' : profile.social.youtube),
            twitter: (loading || !profile.social ? '' : profile.social.twitter),
            facebook: (loading || !profile.social ? '' : profile.social.facebook),
            linkedin: (loading || !profile.social ? '' : profile.social.linkedin),
            instagram: (loading || !profile.social ? '' : profile.social.instagram),
            pinterest: (loading || !profile.social ? '' : profile.social.pinterest)
        })
    }, [loading]);

    /* Destructure(d) Data */
    const {
        location,
        status,
        skills,
        bio,
        website,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
        pinterest
    } = profileData;

    /* Action Functions */
    const onChange = e => setProfileData({ ...profileData, [e.target.name]: e.target.value });
    const onSubmit = e => { e.preventDefault(); upgradeAccount(profileData, history, true)};

    return (
        <Fragment>
            
            {/* Profile Header */}
            <h1 className="large text-primary">Edit Your HOST® Membership Profile</h1>
            <p className="lead"><i className="far fa-address-card" /> Please tell us something about yourself</p>
            <small>* = Required Field</small>
            
            {/* Profile Form */}
            <form className="form" onSubmit={ e => onSubmit(e)}>
                
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}></input>
                    <small>In which city do you live?</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)}></input>
                    <small>Do you have your own website?</small>
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
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>

            </form>

        </Fragment>
    )
}

/* Setting Edit Profile PropType Config */
EditProfile.propTypes = {
    upgradeAccount: PropTypes.func.isRequired,
    getAccountProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

/* Mapping Redux State To Component */
const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { upgradeAccount, getAccountProfile })(withRouter(EditProfile));
