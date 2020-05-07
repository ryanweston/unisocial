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

                <li><Link to='/'>Home</Link></li>
                {(!props.loading && props.isAuthenticated ? (
                    <Fragment>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/' onClick={props.logout}>Logout</Link></li>
                    </Fragment>
                ) : (
                        <Fragment>
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/login'>Login</Link></li>
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

const mapDispatchToProps =

    Nav.protoType = {
        logout: PropTypes.func.isRequired
    }

export default connect(mapStateToProps, { logout })(Nav); 
