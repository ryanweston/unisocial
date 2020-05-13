import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import '../../Buttons.css';
import '../../ViewReview.css';

class UniversityView extends React.Component {

    close = () => {
        this.props.handleModalOpen(null);
    }

    render() {

        return (
            (!this.props.currentState ? (<div></div>) : (<Fragment>
                <div className="overlay">
                    <button onClick={this.close}>X</button>
                    <h1>{this.props.details.name}</h1>
                    <br />
                    {/* <label>📈 <b>Total:</b></label>
                    <p>{this.props.details.scores.total.toFixed(2)} / 5</p> */}

                    <div className="scoresContainer">
                        {/* <ul>
                            <li> */}
                        <div className="item">
                            <label>🍻 Nightlife: </label>
                            <progress className="progress" value={this.props.details.scores.nightlife.toFixed(2)} max="5.00"> </progress>
                            {/* <p>{this.props.details.scores.nightlife.toFixed(2)} / 5</p> */}
                            {/* </li>
                            <li> */}
                        </div>
                        <div className="item">
                            <label>😆 Happiness: </label>
                            <progress className="progress" value={this.props.details.scores.happiness.toFixed(2)} max="5.00"> </progress>
                            {/* <p>{this.props.details.scores.happiness.toFixed(2)} / 5</p> */}
                        </div>
                        {/* </li>
                        </ul>
                        <ul>
                            <li> */}
                        <div className="item">
                            <label>🌎 Internet: </label>
                            <progress className="progress" value={this.props.details.scores.internet.toFixed(2)} max="5.00"> </progress>
                            {/* <p>{this.props.details.scores.internet.toFixed(2)} / 5</p> */}
                            {/* </li>
                        </ul> */}
                        </div>
                    </div>
                </div>
            </Fragment>))
        )
    }
}

export default UniversityView;