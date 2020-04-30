import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;

    const changeState = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    async function loginSubmit(e) {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = {
            email,
            password
        }
        console.log(body);
        try {
            const res = await axios.post('api/auth', body, config);
            console.log(res.data);
        } catch (err) { }
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

export default Login;
