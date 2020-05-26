import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { postReview } from '../../actions/dashboard';
import '../../styles/Reviews.css';
import '../../styles/Buttons.css';
import { Redirect } from 'react-router-dom';

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
                <Redirect to='/dashboard' />
            </Fragment>) : (
                    <div className="fullPage margin-reset">
                        <form onSubmit={e => onSubmit(e)} className="scoresContainer submission">
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🍻</span> Nightlife</label>
                                <input name="nightlife" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">😁</span> Happiness</label>
                                <input name="happiness" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">👨‍🎓</span> Societies</label>
                                <input name="societies" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">⚽</span> Sports</label>
                                <input name="sports" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🗣</span> Freedom Of Speech</label>
                                <input name="freedom_of_speech" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🎭</span> Culture</label>
                                <input name="culture" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">☁</span> Weather</label>
                                <input name="weather" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🌈</span> LGBTQ+ Friendly</label>
                                <input name="LGBTQ_friendly" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🚨</span> Crime</label>
                                <input name="crime" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🌐</span> Internet</label>
                                <input name="internet" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🧠</span> Mental Health</label>
                                <input name="mental_health" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🌃</span> Student Events</label>
                                <input name="student_events" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🌳</span> Nature</label>
                                <input name="nature" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🌎</span> Diversity</label>
                                <input name="diversity" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">🏠</span> Accomodation</label>
                                <input name="accomodation" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>
                            <div className="item">
                                <label><span role="img" aria-label="sheep">💸</span> Cost Of Living</label>
                                <input name="cost_of_living" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
                            </div>

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