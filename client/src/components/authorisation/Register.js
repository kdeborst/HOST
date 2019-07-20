/* Required Dependencies */
import React, { Fragment, useState } from 'react';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/authorisation';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    
    /* Initialising State */
    const [regFormData, setRegFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    });

    /* Destructure(d) Data */
    const { name, email, password, password_confirm } = regFormData;
    
    /* Event Handlers */
    const onChange = e => setRegFormData({ ...regFormData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        
        if(password !== password_confirm) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    }
    
    /* Redirect When Registered In */
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (

        <Fragment>
            
            <main className="container">

                {/* Registration Form Header */}
                <h1 className="large text-primary">HOST® Account Registration</h1>
                <p className="lead">
                    <i className="fas fa-user-edit"></i> Create Your Account
                </p>

                {/* Registration Form */}
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            name="name" 
                            value={name} 
                            onChange={e => onChange(e)} 
                            required>
                        </input>
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            name="email" 
                            value={email} 
                            onChange={e => onChange(e)} 
                            required>
                        </input>
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            minLength="6" 
                            value={password} 
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Confirm password" 
                            name="password_confirm" 
                            minLength="6" 
                            value={password_confirm} 
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
                    <input 
                        type="submit" 
                        className="btn btn-primary" 
                        value="Register">
                    </input>
                </form>

                {/* Login Referral */}
                <p className="my-1">Already have an account? 
                    <Link to="/login"> Login</Link>
                </p>

            </main>

        </Fragment>

    )

}

/* Setting Register PropType Config */
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

/* Mapping Redux State To Component */
const mapStateToProps = state => ({
    isAuthenticated: state.authorisation.isAuthenticated // or try authentication if it doesnt work like this..
});

export default connect(mapStateToProps, { setAlert, register }) (Register);
