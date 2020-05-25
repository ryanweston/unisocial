import React, { Fragment } from 'react';

const Review = (props) => {
    return (
        <Fragment>
            <div className="scoresContainer viewReview">
                <div className="item">
                    <label><span role="img" aria-label="sheep">🍻</span> Nightlife</label>
                    <progress className="progress" target={"_" + props.scores.nightlife.toFixed(0)} value={props.scores.nightlife.toFixed(2)} max="5.00"> </progress>
                </div>

                <div className="item">
                    <label><span role="img" aria-label="sheep">😁</span> Happiness</label>
                    <progress className="progress" target={"_" + props.scores.happiness.toFixed(0)} value={props.scores.happiness.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">👨‍🎓</span> Societies</label>
                    <progress className="progress" target={"_" + props.scores.societies.toFixed(0)} value={props.scores.societies.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">⚽</span> Sports</label>
                    <progress className="progress" target={"_" + props.scores.sports.toFixed(0)} value={props.scores.sports.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🗣</span> Freedom of Speech</label>
                    <progress className="progress" target={"_" + props.scores.freedom_of_speech.toFixed(0)} value={props.scores.freedom_of_speech.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🎭</span> Culture</label>
                    <progress className="progress" target={"_" + props.scores.culture.toFixed(0)} value={props.scores.culture.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">☁</span > Weather</label>
                    <progress className="progress" target={"_" + props.scores.weather.toFixed(0)} value={props.scores.weather.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🌈</span> LGBTQ+ Friendly</label>
                    <progress className="progress" target={"_" + props.scores.LGBTQ_friendly.toFixed(0)} value={props.scores.LGBTQ_friendly.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🚨</span> Crime</label>
                    <progress className="progress" target={"_" + props.scores.crime.toFixed(0)} value={props.scores.crime.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🌐</span> Internet</label>
                    <progress className="progress" target={"_" + props.scores.internet.toFixed(0)} value={props.scores.diversity.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🧠</span> Mental Health</label>
                    <progress className="progress" target={"_" + props.scores.mental_health.toFixed(0)} value={props.scores.mental_health.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🌃‍</span> Student Events</label>
                    <progress className="progress" target={"_" + props.scores.student_events.toFixed(0)} value={props.scores.student_events.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🌳</span> Nature</label>
                    <progress className="progress" target={"_" + props.scores.nature.toFixed(0)} value={props.scores.nature.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🌎</span> Diversity</label>
                    <progress className="progress" target={"_" + props.scores.diversity.toFixed(0)} value={props.scores.diversity.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">🏠</span> Accomodation</label>
                    <progress className="progress" target={"_" + props.scores.accomodation.toFixed(0)} value={props.scores.accomodation.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label><span role="img" aria-label="sheep">💸</span> Cost Of Living</label>
                    <progress className="progress" target={"_" + props.scores.cost_of_living.toFixed(0)} value={props.scores.cost_of_living.toFixed(2)} max="5.00"> </progress>
                </div>

            </div>
        </Fragment>
    )

}

export default Review;