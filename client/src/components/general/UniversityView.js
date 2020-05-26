import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Buttons.css';
import '../../styles/Reviews.css';
// import emojis from './emojis.js';

const UniversityView = (props) => {

    //The handler is passed in as a prop to allow closing within this component
    //it will take the value of null as a parameter to reset the university details state.
    const close = () => {
        props.handleModalOpen(null);
    }

    // TO DO: Shift scores into array to clean code up. Can't pass event through onLoad in react, so
    // due to time constraints long winded solution of using target value rounded was necessary.

    return (
        (!props.currentState ? (<div></div>) : (<Fragment>
            <div className="overlay no-blur" id="overlay">
                <button className="close black" onClick={close}>X</button>


                {/* <label>📈 <b>Total:</b></label>
                    <p>{props.details.scores.total.toFixed(2)} / 5</p> */}
                <div className="scoresHeader">
                    <div className="scoresHeader-content">
                        <h1>{props.details.name}</h1>
                    </div>
                    <img src={props.image[0].src} alt="University campus"></img>

                </div>
                <div className="contentContainer">
                    <div className="scoresContainer frontpageScores">

                        {Object.keys(props.details.scores).map(key => {
                            return <div className="item">
                                <label><span role="img" aria-label="sheep">🍻</span> {key}</label>
                                <progress className="progress" target={"_" + props.details.scores[key].toFixed(0)} value={props.details.scores[key].toFixed(2)} max="5.00"> </progress>
                            </div>


                            console.log(key + props.details.scores[key]);
                        })}
                        {/* <div className="item">
                            <label><span role="img" aria-label="sheep">🍻</span> Nightlife</label>
                            <progress className="progress" target={"_" + props.details.scores.nightlife.toFixed(0)} value={props.details.scores.nightlife.toFixed(2)} max="5.00"> </progress>
                        </div>

                        <div className="item">
                            <label><span role="img" aria-label="sheep">😁</span> Happiness</label>
                            <progress className="progress" target={"_" + props.details.scores.happiness.toFixed(0)} value={props.details.scores.happiness.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">👨‍🎓</span> Societies</label>
                            <progress className="progress" target={"_" + props.details.scores.societies.toFixed(0)} value={props.details.scores.societies.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">⚽</span> Sports</label>
                            <progress className="progress" target={"_" + props.details.scores.sports.toFixed(0)} value={props.details.scores.sports.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🗣</span> Freedom of Speech</label>
                            <progress className="progress" target={"_" + props.details.scores.freedom_of_speech.toFixed(0)} value={props.details.scores.freedom_of_speech.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🎭</span> Culture</label>
                            <progress className="progress" target={"_" + props.details.scores.culture.toFixed(0)} value={props.details.scores.culture.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">☁</span > Weather</label>
                            <progress className="progress" target={"_" + props.details.scores.weather.toFixed(0)} value={props.details.scores.weather.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🌈</span> LGBTQ+ Friendly</label>
                            <progress className="progress" target={"_" + props.details.scores.LGBTQ_friendly.toFixed(0)} value={props.details.scores.LGBTQ_friendly.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🚨</span> Crime</label>
                            <progress className="progress" target={"_" + props.details.scores.crime.toFixed(0)} value={props.details.scores.crime.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🌐</span> Internet</label>
                            <progress className="progress" target={"_" + props.details.scores.internet.toFixed(0)} value={props.details.scores.diversity.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🧠</span> Mental Health</label>
                            <progress className="progress" target={"_" + props.details.scores.mental_health.toFixed(0)} value={props.details.scores.mental_health.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🌃‍</span> Student Events</label>
                            <progress className="progress" target={"_" + props.details.scores.student_events.toFixed(0)} value={props.details.scores.student_events.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🌳</span> Nature</label>
                            <progress className="progress" target={"_" + props.details.scores.nature.toFixed(0)} value={props.details.scores.nature.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🌎</span> Diversity</label>
                            <progress className="progress" target={"_" + props.details.scores.diversity.toFixed(0)} value={props.details.scores.diversity.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🏠</span> Accomodation</label>
                            <progress className="progress" target={"_" + props.details.scores.accomodation.toFixed(0)} value={props.details.scores.accomodation.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">💸</span> Cost Of Living</label>
                            <progress className="progress" target={"_" + props.details.scores.cost_of_living.toFixed(0)} value={props.details.scores.cost_of_living.toFixed(2)} max="5.00"> </progress>
                        </div> */}

                    </div>
                    <div className="total">
                        <label>Total Score</label>
                        <h2>{props.details.scores.total.toFixed(2)}</h2>
                    </div>
                    <div className="overlayBottom">
                        <Link to="/dashboard">
                            <button className="overlaySubmit blue">Are you a student here? Submit your own review. <i className="fas fa-long-arrow-alt-right"></i></button>
                        </Link>
                    </div>
                </div>

            </div>
        </Fragment>))
    )
}

export default UniversityView; 