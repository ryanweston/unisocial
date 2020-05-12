import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Review from './Review';
import { deleteReview } from '../../actions/dashboard';

const ViewReview = (props) => {

    const [deleteCheck, deleteChange] = useState({
        delete: false,
    });

    const handleDelete = () => deleteChange(
        (prevState) => {
            return {
                delete: !prevState.delete
            }
        }
    )

    console.log(deleteCheck.delete);
    return (
        <Fragment>
            {(!props.review ? (<Link to="/submit">
                <button><h1> <i class="fas fa-long-arrow-alt-right"></i> Submit a review</h1></button>
            </Link>) : (<Fragment>
                <h1>Your current review:</h1>
                <Review scores={props.review.scores} />
                <Link to="/submit">
                    <button><h1><i class="fas fa-edit"></i> Edit review</h1></button>
                </Link>
                <br />
                <Link to='/dashboard'>
                    <button onClick={handleDelete}><h1><i class="fas fa-trash-alt"></i> Delete Review</h1></button>
                </Link>
                {(deleteCheck.delete === false ? (<Fragment></Fragment>) : (<div>
                    <p>Are you sure you want to delete?</p>
                    <button onClick={() => { handleDelete(); props.deleteReview(); }}>Yes</button>
                    <button onClick={handleDelete}>No</button>
                </div>))}
            </Fragment>))}
        </Fragment>
    )
}

ViewReview.propTypes = {
    deleteReview: PropTypes.func.isRequired
}

export default connect(null, { deleteReview })(ViewReview);