import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/login';
import PropTypes from 'prop-types';


const Nav = (props) => {
    console.log(props);
    return (
        <nav className="navbar">
            <ul>

                <li><Link to='/'>HOME</Link></li>
                {(!props.loading && props.isAuthenticated ? (
                    <Fragment>
                        <li><Link to='/dashboard'>DASHBOARD</Link></li>
                        <li><Link to='/' onClick={props.logout}>LOGOUT</Link></li>
                    </Fragment>
                ) : (
                        <Fragment>
                            <li><Link to='/register'>REGISTER</Link></li>
                            <li><Link to='/login'>LOGIN</Link></li>
                        </Fragment>
                    ))}
            </ul>
        </nav>
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
