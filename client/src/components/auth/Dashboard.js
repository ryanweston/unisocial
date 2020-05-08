import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../../actions/dashboard';
import PropTypes from 'prop-types';
import Review from './Review';

const Dashboard = ({ getUserInfo, user, auth }) => {

    useEffect(() => {
        //Ensures getUser has been called first, setting loading to false to prevent race conditions
        if (auth.loading === false) {
            getUserInfo()
        }
    }, [getUserInfo, auth.loading])

    // console.log(user.review.scores.internet);

    return (
        <Fragment>
            {(user.loading && auth.loading ? (<div>
                <h1>LOADING...</h1>
            </div>
            ) : (<div>
                <h1>Profile Information:</h1>
                <p>{auth.user.name}</p>
                <p>{user.email}</p>
                <p>{user.university}</p>
            </div>
                ))}
            <br />
            {(!user.review ? (<Link to="/submit">
                <button><h1>Submit a review</h1></button>
            </Link>) : (<Fragment>

                <h1>Your current review:</h1>
                <Review scores={user.review.scores} />
                <Link to="/submit">
                    <button><h1>Edit review</h1></button>
                </Link>
                <br />
                <Link to="/submit">
                    <button><h1>Delete Review</h1></button>
                </Link>
            </Fragment>))}

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
}


export default connect(mapStateToProps, { getUserInfo })(Dashboard);