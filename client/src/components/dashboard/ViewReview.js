import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/Reviews.css'
import Review from './Review';
import { deleteReview } from '../../actions/dashboard';

const ViewReview = (props) => {

    //Hook that handles state changes to check stage of deletion process
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
                <button>Submit a review <i className="fas fa-long-arrow-alt-right"></i></button>
            </Link>) : (<div className="review-section">
                <h1>Your Review</h1>
                <Review scores={props.review.scores} />
                <Link to="/submit">
                    <button><i className="fas fa-edit"></i> Edit review</button>
                </Link>
                <br />
                <Link to='/dashboard'>
                    <button onClick={handleDelete} className="delete"><i className="fas fa-trash-alt"></i> Delete Review</button>
                </Link>
                {(deleteCheck.delete === false ? (<Fragment></Fragment>) : (<div>
                    <p>Are you sure you want to delete?</p>
                    <button onClick={() => { handleDelete(); props.deleteReview(); }}>Yes</button>
                    <button onClick={handleDelete}>No</button>
                </div>))}
            </div>))}
        </Fragment>
    )
}

ViewReview.propTypes = {
    deleteReview: PropTypes.func.isRequired
}

export default connect(null, { deleteReview })(ViewReview);