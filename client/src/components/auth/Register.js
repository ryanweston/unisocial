import React, { Fragment, useState } from 'react';
import axios from 'axios';
import UniversityList from './UniversityList';

const Register = () => {

    // use state initialises objects default format. hook runs function on the given object

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const { name, email, password, passwordConfirm } = formData;

    // function runs from event, changing relevant form data for each input by selected name and it's corresponding value
    // ... operator preserves previous data from form, only changing states of given input
    const formChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const formSubmit = async e => {
        //Prevents default HTML handling, in this instance causing the page to refresh.
        e.preventDefault();

        if (password !== passwordConfirm) {
            console.log('Passwords do not match');
        } else {
            console.log(formData);


            const registerUser = {
                name,
                email,
                password
            }
            try {
                //Sets headers for the post
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                //Converts JS object to JSON string format
                const body = JSON.stringify(registerUser);
                //Runs function and stores response
                const res = await axios.post('/api/users', body, config);
                console.log(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        }

    }

    return (
        <Fragment>

            <h1>Sign Up</h1>
            <form onSubmit={e => formSubmit(e)}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={e => formChange(e)}
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => formChange(e)}
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => formChange(e)}
                />
                <label>Verify Password</label>
                <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="Verify Password"
                    value={passwordConfirm}
                    onChange={e => formChange(e)}
                />
                <input type="submit" />
            </form>
        </Fragment>
    );
};

export default Register;