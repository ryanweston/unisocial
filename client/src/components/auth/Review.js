import React, { Fragment } from 'react';

const Review = (props) => {
    return (
        <Fragment>
            <div className="scoresContainer viewReview">
                <div className="item">
                    <label>🍻 Nightlife:</label>
                    <progress className="progress" value={props.scores.nightlife.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label>😄 Happiness</label>
                    <progress className="progress" value={props.scores.happiness.toFixed(2)} max="5.00"> </progress>
                </div>
                <div className="item">
                    <label>🌎 Internet</label>
                    <progress className="progress" value={props.scores.internet.toFixed(2)} max="5.00"> </progress>
                </div>`

            </div>
        </Fragment>
    )

}

export default Review;