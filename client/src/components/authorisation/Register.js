import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    
    /* Initialising State */
    const [regFormData, setRegFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    });

    /* Destructured Data */
    const { name, email, password, password_confirm } = regFormData;
    
    /* Event Variables */
    const onChange = e => setRegFormData({ ...regFormData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if(password !== password_confirm) {
            console.log('Passwords do not match');
        } else {
            console.log(regFormData);
        }
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

export default Register
