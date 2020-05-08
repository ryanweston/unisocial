import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../actions/dashboard';
import PropTypes from 'prop-types';
import ViewReview from './ViewReview';

const Dashboard = ({ getUserInfo, user, auth }) => {

    useEffect(() => {
        //Ensures getUser has been called first, setting loading to false to prevent race conditions
        if (auth.loading === false) {
            getUserInfo()
        }
    }, [getUserInfo, auth.loading]);

    return (
        <Fragment>
            {(user.loading && auth.loading ? (<div>
                <h1>LOADING...</h1>
            </div>) : (<div>
                <h1>Profile Information:</h1>
                <p>{auth.user.name}</p>
                <p>{user.email}</p>
                <p>{user.university}</p>
                <ViewReview review={user.review} />
            </div>))}
            <br />
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


export default connect(mapStateToProps, { getUserInfo })(Dashboard);