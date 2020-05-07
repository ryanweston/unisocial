import React, { useState, onChange } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/login';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha'

const Login = ({ login }) => {

    console.log(localStorage);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;

    const changeState = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    // const captcha = document.querySelector('#g-recaptcha-response').value;
    const recaptchaRef = React.createRef();

    async function loginSubmit(e) {
        e.preventDefault();

        const captcha = recaptchaRef.current.getValue();
        console.log(captcha);

        const loginUser = {
            email,
            password,
            captcha
        }
        login(loginUser);
    }

    return (
        <section className="login" onSubmit={e => loginSubmit(e)}>
            <form>
                <label>Email</label>
                <input name="email" type="email" onChange={(e) => changeState(e)} />
                <label>Password</label>
                <input name="password" type="password" onChange={(e) => changeState(e)} />
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Le3m_MUAAAAAGGupKFXSTuNEIBjwAB486DNz6NY"
                    onChange={onChange}
                />
                <input type="submit" />
            </form>
        </section>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(null, { login })(Login);
