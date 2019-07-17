import React from 'react'

const Navigation = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="index.html">HOST®</a>
            </h1>
            <ul>
                <li><a href="community.html"><i className="fas fa-utensils"></i> HOST® Community</a></li>
                <li><a href="about.html"><i className="fas fa-info"></i> Become a HOST®</a></li>
                <li><a href="login.html"><i className="fas fa-sign-in-alt"></i> Login</a></li>
                <li><a href="register.html"><i className="far fa-registered"></i> Register</a></li>
            </ul>
        </nav>
    )
}

export default Navigation
