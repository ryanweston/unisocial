import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { editReview } from '../../../actions/dashboard';
import { getUserInfo } from '../../../actions/dashboard';
import '../../../styles/Reviews.css';
import '../../../styles/Buttons.css';
import { Redirect } from 'react-router-dom';
import emojis from '../../general/emojis'


const EditReview = ({ editReview, submission, user, auth }) => {

    //Will call an error if /edit route is loaded without coming from dashboard previously,
    //even if reloaded. This is due to getUserInfo needing to be called before render (will be called before you load the page, in dashboard)
    //and the fact that the states below require the information, before this page is rendered. 
    const [formData, setFormData] = useState({
        internet: user.review.scores.internet,
        nightlife: user.review.scores.nightlife,
        happiness: user.review.scores.happiness,
        societies: user.review.scores.societies,
        sports: user.review.scores.sports,
        freedom_of_speech: user.review.scores.freedom_of_speech,
        culture: user.review.scores.culture,
        weather: user.review.scores.weather,
        LGBTQ_friendly: user.review.scores.LGBTQ_friendly,
        crime: user.review.scores.crime,
        mental_health: user.review.scores.mental_health,
        student_events: user.review.scores.mental_health,
        nature: user.review.scores.nature,
        diversity: user.review.scores.diversity,
        accomodation: user.review.scores.accomodation,
        cost_of_living: user.review.scores.cost_of_living,
    });

    useEffect(() => {
        //Ensures getUser has been called first, setting loading to false to prevent race conditions
        if (auth.loading === false) {
            getUserInfo()
        }
    }, [getUserInfo, auth.loading]);



    const changeValue = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Sets value parameters for slider colour changes
    // const changeColour = e => {
    //     console.log("TEST TEST TEST")
    //     if (e.target.value >= 0) {
    //         e.target.className = 'red'
    //     }
    //     if (e.target.value >= 1.5) {
    //         e.target.className = 'orange'
    //     }
    //     if (e.target.value >= 3.5) {
    //         e.target.className = 'green'
    //     }
    // }

    console.log(formData);

    const onSubmit = e => {
        e.preventDefault();
        const data = formData;
        editReview(data);
    }

    // console.log(review.weather);


    //TODO: Map data out from object, like previously achieved in dash review and university view.
    return (
        <Fragment>
            {(!auth.isAuthenticated ? (
                <Redirect to='/register'></Redirect>
            ) : (<Fragment>
                {(user.loading === true && auth.loading === true ? (<div>
                    <h1>LOADING...</h1>
                </div>) : (

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
                                                    console.log(val);
                                                    return <div className="item">
                                                        <label><span role="img" aria-label={emoji[0].label}>{emoji[0].emoji}</span> {labelKey} <span className="editNum">{formData[key]}</span></label>
                                                        <input name={key} className='default' target={"_" + val} type="range" min="0.25" max="5" step="0.25" value={formData[key]} onChange={e => { changeValue(e) }} />
                                                    </div>
                                                })}
                                            <div className="full">
                                                <button className="black top-margin" type="submit"><i className="fas fa-check"></i> Submit Edit</button>
                                            </div>

                                        </form>
                                    </div>

                                ))}
                        </Fragment>



                    ))}
            </Fragment>
                ))}
        </Fragment >
    )
}

const mapStateToProps = state => {
    return {
        auth: state.register,
        user: state.dashboard,
        submission: state.dashboard.submission
    }
}

export default connect(mapStateToProps, { getUserInfo, editReview })(EditReview);