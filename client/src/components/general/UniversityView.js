import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Buttons.css';
import '../../styles/Reviews.css';
import emojis from './emojis.js';

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

                <div className="scoresHeader">
                    <div className="scoresHeader-content">
                        <h1>{props.details.name}</h1>
                    </div>
                    <img src={props.image[0].src} alt="University campus"></img>
                </div>

                <div className="contentContainer">
                    <div className="scoresContainer frontpageScores">
                        {/* Loops & maps score values from object */}
                        {
                            Object.keys(props.details.scores).map(key => {
                                let string = key;
                                let labelKey = string.replace(/_/g, " ");
                                const emoji = emojis.filter(emojis => emojis.type === key);

                                //Checks against key being total, as total is displayed below in seperate code block
                                if (key !== 'total') {
                                    return <div className="item">
                                        <label><span role="img" aria-label="sheep">{emoji[0].emoji}</span> {labelKey}</label>
                                        <progress className="progress" target={"_" + props.details.scores[key].toFixed(0)} value={props.details.scores[key].toFixed(2)} max="5.00"> </progress>
                                    </div>
                                }
                            })}
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