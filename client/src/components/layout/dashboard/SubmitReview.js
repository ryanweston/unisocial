import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { postReview } from '../../../actions/dashboard';
import '../../../styles/Reviews.css';
import '../../../styles/Buttons.css';
import { Redirect } from 'react-router-dom';
import emojis from '../../general/emojis'

const SubmitReview = ({ postReview, submission }) => {

    const [formData, setFormData] = useState({
        internet: null,
        nightlife: null,
        happiness: null,
        societies: null,
        sports: null,
        freedom_of_speech: null,
        culture: null,
        weather: null,
        LGBTQ_friendly: null,
        crime: null,
        mental_health: null,
        student_events: null,
        nature: null,
        diversity: null,
        accomodation: null,
        cost_of_living: null,
    });

    const changeValue = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Sets value parameters for slider colour changes

    console.log(formData);

    const onSubmit = e => {
        e.preventDefault();
        const data = formData;
        postReview(data);
    }

    return (
        <Fragment>
            {(submission.success ? (<Fragment>
                <Redirect to='/dashboard' />
            </Fragment>) : (
                    <div className="fullPage margin-reset">
                        <form onSubmit={e => onSubmit(e)} className="scoresContainer submission">

                            {
                                // Loops & maps score values from object 
                                Object.keys(formData).map(key => {
                                    let string = key;
                                    let labelKey = string.replace(/_/g, " ");
                                    const emoji = emojis.filter(emojis => emojis.type === key);

                                    //Round value
                                    let val = parseFloat(formData[key]).toFixed(0);

                                    //Checks against key being total, as total is displayed below in seperate code block

                                    return <div className="item">
                                        <label><span role="img" aria-label={emoji[0].label}>{emoji[0].emoji}</span> {labelKey} <span className="editNum">{formData[key]}</span></label>
                                        <input name={key} className='default' target={"_" + val} type="range" min="0.25" max="5" step="0.25" value={formData[key]} onChange={e => { changeValue(e) }} />
                                    </div>
                                })}

                            <div className="full">
                                <button className="black top-margin" type="submit"><i className="fas fa-check"></i> Submit</button>
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