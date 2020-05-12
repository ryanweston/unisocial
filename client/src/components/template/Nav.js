import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/login';
import PropTypes from 'prop-types';
import '../../Nav.css';


const Nav = (props) => {
    console.log(props);
    return (<Fragment>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill="#F4F9F4" fill-opacity="1" d="M0,160L80,154.7C160,149,320,139,480,117.3C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
        <div className="navWrapper">
            <Link className="logoContainer" to='/'>UNI.SOCIAL</Link>

            <nav className="navbar">

                <ul>
                    {(!props.loading && props.isAuthenticated ? (
                        <Fragment>
                            <li><Link to='/dashboard'><i class="fas fa-user"> </i> Dashboard</Link></li>
                            <li><Link to='/' onClick={props.logout}><i class="fas fa-sign-out-alt"></i></Link></li>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <li><Link to='/register'>Register</Link></li>
                                <li><Link to='/login'>Login</Link></li>
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
