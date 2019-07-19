/* Required Dependencies */
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    
    /* Initialising State */
    const [logFormData, setLogFormData] = useState({
        email: '',
        password: ''
    });

    /* Destructure(d) Data */
    const { email, password } = logFormData;
    
    /* Event Handlers */
    const onChange = e => setLogFormData({ ...logFormData, [e.target.name]: e.target.value });
    const onSubmit = async e => {e.preventDefault(); console.log('Success');}
    
    return (

        <Fragment>
            
            <main className="container">

                {/* Login Form Header */}
                <h1 className="large text-primary">HOST® Member Login</h1>
                <p className="lead">
                    <i className="fas fa-concierge-bell"></i> Login to your account:
                </p>

                {/* Login Form */}
                <form className="form" onSubmit={e => onSubmit(e)}>
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
                    <input 
                        type="submit" 
                        className="btn btn-primary" 
                        value="Login">
                    </input>
                </form>

                {/* Registration Referral */}
                <p className="my-1">No Account Yet? 
                    <Link to="/register"> Register</Link>
                </p>

            </main>

        </Fragment>

    )
    
}

export default Login