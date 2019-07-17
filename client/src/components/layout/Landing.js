import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        
        <main className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>HOST®: Prepare, Share & Experience</h1>
                    <p className="lead">
                        The online social community for locating, connecting and promoting (local) hosts 
                        who want to prepare food for pickup or organise a meal-share event at home.
                    </p>
                    <div className="buttons">
                        <Link className="btn btn-primary" to="/register">Register</Link>
                        <Link className="btn btn-primary" to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </main>
        
    )
}

export default Landing
