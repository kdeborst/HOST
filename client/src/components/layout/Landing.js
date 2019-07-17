import React from 'react'

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
                        <a className="btn btn-primary" href="register.html">Register</a>
                        <a className="btn btn-primary" href="login.html">Login</a>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Landing
