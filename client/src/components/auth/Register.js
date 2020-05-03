import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import UniversityList from './UniversityList';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
    // use state initialises objects default format. hook runs function on the given object
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [dropdown, setDropdown] = useState({
        loading: true,
        options: [null],
        selected: ''
    })

    const formChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const dropdownChange = e => setDropdown({ ...dropdown, selected: e.target.value });

    //Will run error declaring missing dependacy, however I only want the function to run once after render,
    //so warning should be ignored.

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get('/api/university');
                // Recieved errors in get reponse, had to convert to string to place in JS object array.
                const string = JSON.stringify(response.data.list);
                const uni = JSON.parse(string);
                // Fills options with JSON request then sets loading to false which can be checked against
                setDropdown({ selected: '', options: uni, loading: false });
            } catch (err) {
            }
        }
        fetchList();
    }, []);

    useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    }, []);

    const universityCheck = [];
    function universityChecker() {
        for (var i = 0; i < dropdown.options.length; i++) {
            var obj = dropdown.options[i]._id;
            universityCheck.push(obj);
        }
    }

    // Checks agains the amount of times the uni data is called
    // if (dropdown.loading === false) {
    //     console.log(dropdown);
    // }



    const { name, email, password, passwordConfirm } = formData;
    const university = dropdown.selected;


    // function runs from event, changing relevant form data for each input by selected name and it's corresponding value
    // ... operator preserves previous data from form, only changing states of given input

    const onSubmit = async e => {
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

            console.log(registerUser);
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
            <UniversityList onValueChange={dropdownChange} state={dropdown} />
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(Register);