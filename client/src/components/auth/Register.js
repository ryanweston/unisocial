import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import UniversityList from './UniversityList';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/register';
import PropTypes from 'prop-types';

const Register = ({ setAlert, universities, loading, register }) => {
    // use state initialises objects default format. hook runs function on the given object
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [dropdown, setDropdown] = useState({
        selected: ''
    })

    const formChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const dropdownChange = e => setDropdown({ ...dropdown, selected: e.target.value });

    const universityCheck = [];
    function universityChecker() {
        for (var i = 0; i < universities[0].length; i++) {
            var obj = universities[0][i]._id;
            universityCheck.push(obj);
        }
    }

    const { name, email, password, passwordConfirm } = formData;
    const university = dropdown.selected;


    // function runs from event, changing relevant form data for each input by selected name and it's corresponding value
    // ... operator preserves previous data from form, only changing states of given input

    const onSubmit = e => {
        //Prevents default HTML handling, in this instance causing the page to refresh.
        e.preventDefault();

        console.log('cool');

        universityChecker();

        if (password !== passwordConfirm) {
            setAlert('Passwords do not match', 'danger');
        } else if (universityCheck.indexOf(university) === -1) {
            setAlert('Select your university', 'danger');
        } else {
            //Creates object using variable that stored the form data
            const registerUser = {
                name,
                email,
                password,
                university
            }
            register(registerUser);
        }
    }

    return (
        <Fragment>

            <h1>Sign Up</h1>
            <form onSubmit={e => onSubmit(e)}>
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
            {loading || !universities ? (<div>loading...</div>) : (<div>
                <UniversityList onValueChange={dropdownChange} options={universities[0]} />
            </div>)
            }
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

const mapStatesToProps = state => {
    return {
        universities: state.uniFetch.universities,
        loading: state.uniFetch.loading
    }
}



export default connect(mapStatesToProps, { setAlert, register })(Register);