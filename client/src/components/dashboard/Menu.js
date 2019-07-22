import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
    
        <div className="dashboard-buttons">
            <Link to="/edit-profile"className="btn btn-light" ><i className="fas fa-user-edit"></i> Edit Profile</Link>
            <Link to="/add-experience"className="btn btn-light" ><i className="fas fa-store"></i> Add Experience</Link>
            <Link to="/create-message"className="btn btn-light" ><i className="fas fa-envelope-open-text"></i> Add Message</Link>
        </div>

    )
}

export default Menu
