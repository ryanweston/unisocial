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
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill="#f3f4f5" d="M0,64L60,96C120,128,240,192,360,186.7C480,181,600,107,720,80C840,53,960,75,1080,85.3C1200,96,1320,96,1380,96L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg> */}
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
