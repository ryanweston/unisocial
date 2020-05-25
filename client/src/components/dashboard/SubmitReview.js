import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { postReview } from '../../actions/dashboard';
import '../../styles/Reviews.css';

const SubmitReview = ({ postReview, submission }) => {

    const [formData, setFormData] = useState({
        internet: null,
        nightlife: null,
        happiness: null,
    });

    const changeValue = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Sets value parameters for slider colour changes
    const changeColour = e => {
        if (e.target.value >= 0) {
            e.target.className = 'red'
        }
        if (e.target.value >= 1.5) {
            e.target.className = 'orange'
        }
        if (e.target.value >= 3.5) {
            e.target.className = 'green'
        }
    }

    console.log(formData);

    const onSubmit = e => {
        e.preventDefault();
        const data = formData;
        postReview(data);
    }

    return (
        <Fragment>
            {(submission.success ? (<Fragment>
                <h1>Submission Successful</h1>

            </Fragment>) : (
                    <div className="fullPage">

                        <form onSubmit={e => onSubmit(e)} className="scoresContainer submission">
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🐑</span> Internet:</label>
                                <input name="internet" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🐑</span> Nightlife:</label>
                                <input name="nightlife" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🐑</span> Happiness</label>
                                <input name="happiness" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🐑</span> Happiness</label>
                                <input name="happiness" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <br />
                            <div className="full">
                                <button type="submit"><i class="fas fa-check"></i> Submit</button>
                            </div>

                        </form>
                    </div>))
            }
        </Fragment >
    )
}

const mapStateToProps = state => {
    return {
        submission: state.dashboard.submission
    }
}

export default connect(mapStateToProps, { postReview })(SubmitReview);