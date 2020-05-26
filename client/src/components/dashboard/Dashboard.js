import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../actions/dashboard';
import { deleteUser } from '../../actions/login';
import '../../styles/Reviews.css';
import '../../styles/Buttons.css'
import PropTypes from 'prop-types';
import ViewReview from './DashReview';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ getUserInfo, user, auth, deleteUser }) => {

    //Popup states for review/user deletion
    const [deleteOption, optionSet] = useState({
        popUp: false,
        popUp2: false
    });

    //useEffect is similar to didComponentMount, but for non-class components
    //will run after the component DOM has rendered.
    useEffect(() => {
        //Ensures getUser has been called first, setting loading to false to prevent race conditions
        if (auth.loading === false) {
            getUserInfo()
        }
    }, [getUserInfo, auth.loading]);

    //Handles account deletion popup hook
    const handleDelete = () => optionSet(
        (prevState) => {
            return {
                ...deleteOption,
                popUp: !prevState.popUp
            }
        }
    )

    //Handles review deletion popup hook
    const handleReview = () => optionSet(
        (prevState) => {
            return {
                // ...deleteOption,
                popUp2: !prevState.popUp2
            }
        }
    )

    console.log(deleteOption.popUp);
    return (

        <Fragment>
            {(!auth.isAuthenticated ? (
                <Redirect to='/'></Redirect>
            ) : (<div className="dashboard">
                {(user.loading && auth.loading ? (<div>
                    <h1>LOADING...</h1>
                </div>) : (<div>
                    <h1>Profile Information</h1>
                    <h2>Name: </h2><p>{auth.user.name}</p><br />
                    <h2>Email: </h2><p>{user.email}</p><br />
                    <h2>University: </h2><p>{user.university}</p>
                    <br />
                    <button onClick={handleDelete} className="black delete account"><i className="fas fa-trash-alt"></i> Delete Account</button>
                    {(deleteOption.popUp2 === false ? (<Fragment></Fragment>) : (<div>
                        <p>Do you want to delete your review also?</p>
                        <button className="black delete" onClick={() => {
                            const option = true;
                            handleReview();
                            deleteUser(option);
                        }}>Yes</button>
                        <button className="black delete" onClick={() => {
                            const option = false;
                            handleReview();
                            //Runs delete user action
                            deleteUser(option);
                        }}>No</button>
                    </div>
                    ))}
                    {(!deleteOption.popUp ? (<Fragment></Fragment>) : (<div>
                        <p>Are you sure you want to delete your account?</p>
                        <button className="black delete" onClick={() => {
                            handleDelete();
                            handleReview();
                        }}>Yes</button>
                        <button className="black delete" onClick={handleDelete}>No</button>
                    </div>))}
                    <ViewReview review={user.review} />
                </div>))}
                <br />
            </div>))}

        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        // From intial login/registration state
        auth: state.register,
        //From dashboard state
        user: state.dashboard
    }
}

Dashboard.propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    // deleteReview: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, { getUserInfo, deleteUser })(Dashboard);