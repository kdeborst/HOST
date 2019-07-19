/* Required Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">HOST®</Link>
            </h1>
            <ul>
                <li><Link to="/community"><i className="fas fa-utensils"></i> HOST® Community</Link></li>
                <li><Link to="/about"><i className="fas fa-info"></i> Become a HOST®</Link></li>
                <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
                <li><Link to="/register"><i className="far fa-registered"></i> Register</Link></li>
            </ul>
        </nav>
        
    )
}

export default Navigation
