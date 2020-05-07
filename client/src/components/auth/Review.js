import React, { Fragment } from 'react';

const Review = (props) => {
    return (
        <Fragment>
            <button>
                <div className="column">
                    <h2>🍻 Nightlife:</h2>
                    <h3>{props.scores.nightlife}</h3>
                    <h2>😄 Happiness</h2>
                    <h3>{props.scores.happiness}</h3>
                    <h2>🌎 Internet</h2>
                    <h3>{props.scores.internet}</h3>
                </div>
            </button>
        </Fragment>
    )

}

export default Review;