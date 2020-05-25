import React, { Fragment } from 'react';
import '../../styles/Buttons.css';
import '../../styles/Reviews.css';

class UniversityView extends React.Component {

    //The handler is passed in as a prop to allow closing within this component
    //it will take the value of null as a parameter to reset the university details state.
    close = () => {
        this.props.handleModalOpen(null);
    }

    render() {
        // console.log(this.props.image);
        return (
            (!this.props.currentState ? (<div></div>) : (<Fragment>
                <div className="overlay no-blur" id="overlay">
                    <button className="close" onClick={this.close}>X</button>


                    {/* <label>📈 <b>Total:</b></label>
                    <p>{this.props.details.scores.total.toFixed(2)} / 5</p> */}
                    <div className="scoresHeader" style={{ backgroundImage: "url(" + this.props.image[0].src + ")" }}>
                        <h1>{this.props.details.name}</h1>
                    </div>
                    <div className="scoresContainer frontpageScores">
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🐑</span> Nightlife: </label>
                            <progress className="progress" value={this.props.details.scores.nightlife.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🐑</span> Happiness: </label>
                            <progress className="progress" value={this.props.details.scores.happiness.toFixed(2)} max="5.00"> </progress>
                        </div>
                        <div className="item">
                            <label><span role="img" aria-label="sheep">🐑</span> Internet: </label>
                            <progress className="progress" value={this.props.details.scores.internet.toFixed(2)} max="5.00"> </progress>
                        </div>

                    </div>
                    <div className="overlayBottom">
                        <button className="overlaySubmit">Are you a student here? Submit your own review.</button>
                    </div>
                </div>
            </Fragment>))
        )
    }
}

export default UniversityView; 