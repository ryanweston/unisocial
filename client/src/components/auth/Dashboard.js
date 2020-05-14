import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../actions/dashboard';
import { deleteUser } from '../../actions/login';
import '../../Reviews.css';
import '../../Buttons.css'
import PropTypes from 'prop-types';
import ViewReview from './ViewReview';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ getUserInfo, user, auth, deleteUser }) => {

    const [deleteOption, optionSet] = useState({
        popUp: false,
        popUp2: false
    })
    useEffect(() => {
        //Ensures getUser has been called first, setting loading to false to prevent race conditions
        if (auth.loading === false) {
            getUserInfo()
        }
    }, [getUserInfo, auth.loading]);

    const handleDelete = () => optionSet(
        (prevState) => {
            return {
                ...deleteOption,
                popUp: !prevState.popUp
            }
        }
    )

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
                    <button onClick={handleDelete} className="delete"><i class="fas fa-trash-alt"></i> Delete Account</button>
                    {(deleteOption.popUp2 === false ? (<Fragment></Fragment>) : (<div>
                        <p>Do you want to delete your review also?</p>
                        <button onClick={() => {
                            const option = true;
                            handleReview();
                            deleteUser(option);
                        }}>Yes</button>
                        <button onClick={() => {
                            const option = false;
                            handleReview();
                            deleteUser(option);
                        }}>No</button>
                    </div>
                    ))}
                    {(!deleteOption.popUp ? (<Fragment></Fragment>) : (<div>
                        <p>Are you sure you want to delete your account?</p>
                        <button onClick={() => {
                            handleDelete();
                            handleReview();
                        }}>Yes</button>
                        <button onClick={handleDelete}>No</button>
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