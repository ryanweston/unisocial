import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/login';
import PropTypes from 'prop-types';
import '../../styles/Nav.css';


const Nav = (props) => {

    //Changes logo text dependant ons screen size.
    let logoText = "UNI.SOCIAL";
    if (window.innerWidth < 600) {
        logoText = "U."
    } else {
        logoText = "UNI SOCIAL"
    }
    console.log(props);

    return (<Fragment>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150"><path fill="#F4F9F4" fillOpacity="1" d="M0,160L80,154.7C160,149,320,139,480,117.3C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
        <div className="navWrapper">
            <Link className="logoContainer" to='/'><p>{logoText}</p></Link>
            <nav className="navbar">
                <ul>
                    {/* If the user is authenticated, display a dashboard and logout button */}
                    {(!props.loading && props.isAuthenticated ? (
                        <Fragment>
                            <li className="left"><Link to='/dashboard'><i className="fas fa-user"> </i> Dashboard</Link></li>
                            <li className="right"><Link to='/' onClick={props.logout}><i className="fas fa-sign-out-alt"></i></Link></li>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <li className="filled"><Link to='/register' className="left">Register</Link></li>
                                <li><Link to='/login' className="right">Login</Link></li>
                            </Fragment>
                        ))}
                </ul>
            </nav>
        </div>
    </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.register.loading,
        user: state.register.user,
        isAuthenticated: state.register.isAuthenticated
    }
}

Nav.protoType = {
    logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { logout })(Nav); 
