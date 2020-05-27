import React, { Fragment } from 'react';
import emojis from './emojis'

const Review = (props) => {
    console.log('VIEW REVIEW COMPONENT RUNNING');
    return (
        <Fragment>
            {
                // Loops & maps score values from object 
                Object.keys(props.scores).map(key => {
                    let string = key;
                    let labelKey = string.replace(/_/g, " ");
                    const emoji = emojis.filter(emojis => emojis.type === key);

                    //Checks against key being total, as total is displayed below in seperate code block
                    if (key !== 'total') {
                        return <div className="item">
                            <label><span role="img" aria-label={emoji[0].label}>{emoji[0].emoji}</span> {labelKey}</label>
                            <progress className="progress" target={"_" + props.scores[key].toFixed(0)} value={props.scores[key].toFixed(2)} max="5.00"> </progress>
                        </div>
                    }
                })}
        </Fragment>
    )
}

export default Review;