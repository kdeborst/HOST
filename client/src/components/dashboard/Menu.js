import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
    
        <div className="dashboard-buttons">
            <Link to="/edit-profile"className="btn btn-light"><i className="fas fa-user-edit"/>{' '}<span className="hide-sm">Edit Profile</span></Link>
            <Link to="/add-experience"className="btn btn-light"><i className="fas fa-store"/>{' '}<span className="hide-sm">Add Experience</span></Link>
        </div>

    )
}

export default Menu
