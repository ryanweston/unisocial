import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UniversityList from './UniversityDropdown';
import '../../styles/Auth.css';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/register';
import PropTypes from 'prop-types';

const Register = ({ setAlert, universities, loading, register, auth }) => {
    // use state initialises objects default format. hook runs function on the given object
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    //Hook that handles state for the selected university
    const [dropdown, setDropdown] = useState({
        selected: ''
    })

    // function runs from event, changing relevant form data for each input by selected name and it's corresponding value
    // ... operator preserves previous data from form, only changing states of given input
    const formChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const dropdownChange = e => setDropdown({ ...dropdown, selected: e.target.value });

    //Pushes the university state data into an array,
    //allows easier reformatting into dropdown
    const universityCheck = [];
    function universityChecker() {
        for (var i = 0; i < universities[0].length; i++) {
            var obj = universities[0][i]._id;
            universityCheck.push(obj);
        }
    }

    const { name, email, password, passwordConfirm } = formData;
    const university = dropdown.selected;


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
            {(auth && !loading ? (<div> <h1>You're already logged in!</h1>
                <Redirect to='/' /></div>) : (<div className="fullPage register">
                    <h1>Sign Up</h1>
                    <div className="formContainer">
                        <form onSubmit={e => onSubmit(e)}>

                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={e => formChange(e)}
                            />
                            <br />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={e => formChange(e)}
                            />
                            <br />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => formChange(e)}
                            />
                            <br />

                            <input
                                type="password"
                                name="passwordConfirm"
                                placeholder="Verify Password"
                                value={passwordConfirm}
                                onChange={e => formChange(e)}
                            />
                            {loading || !universities ? (<div>loading...</div>) : (<Fragment>
                                <UniversityList onValueChange={dropdownChange} options={universities[0]} />
                            </Fragment>)}
                            <input type="submit" value="Register" />
                        </form>
                    </div>
                </div>
                ))}
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

const mapStatesToProps = state => {
    return {
        auth: state.register.isAuthenticated,
        universities: state.uniFetch.universities,
        loading: state.uniFetch.loading
    }
}



export default connect(mapStatesToProps, { setAlert, register })(Register);