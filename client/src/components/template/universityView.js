import React, { Fragment } from 'react';

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
                    <p>{this.props.details.scores[0].total}</p>
                </div>
            </Fragment>))
        )
    }
}

export default UniversityView;