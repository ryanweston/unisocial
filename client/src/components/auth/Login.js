import React, { useState, onChange, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../../actions/login';
import '../../styles/Auth.css';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha'

const Login = ({ login, auth, loading }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;

    //Handles form states, will take event information to set relevant 
    //state object option to the target value.
    const changeState = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Creates captcha instance following reCaptcha react library
    const recaptchaRef = React.createRef();

    //Handles login submission before running login action
    async function loginSubmit(e) {
        e.preventDefault();

        const captcha = recaptchaRef.current.getValue();
        // console.log(captcha);

        const loginUser = {
            email,
            password,
            captcha
        }
        login(loginUser);
    }

    return (
        <Fragment>
            {(auth && !loading ? (<div>
                <Redirect to='/dashboard' />
            </div>) : (<section className="fullPage login" onSubmit={e => loginSubmit(e)}>
                <h1>Login</h1>
                <div className="formContainer">
                    <form>
                        <input name="email" type="email" placeholder="Email Address" onChange={(e) => changeState(e)} />
                        <br />
                        <input name="password" type="password" placeholder="Password" onChange={(e) => changeState(e)} />
                        <div className="captcha">
                            <ReCAPTCHA className="margin"
                                ref={recaptchaRef}
                                sitekey="6Le3m_MUAAAAAGGupKFXSTuNEIBjwAB486DNz6NY"
                                onChange={onChange}
                                theme={'light'}
                            />
                        </div>
                        <input type="submit" value="Login" />
                    </form>
                </div>
            </section>))}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.register.isAuthenticated,
        loading: state.register.loading,
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { login })(Login);
