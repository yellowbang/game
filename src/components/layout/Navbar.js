import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Navbar = (props) => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Werewolf</Link>
            </div>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default connect(mapStateToProps)(Navbar)
