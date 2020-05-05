import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/login';
import PropTypes from 'prop-types';

const Login = ({ login }) => {

    console.log(localStorage);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;

    const changeState = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    async function loginSubmit(e) {
        e.preventDefault();
        const loginUser = {
            email,
            password
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
                <input type="submit" />
            </form>
        </section>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(null, { login })(Login);
