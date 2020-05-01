import React, { Fragment } from 'react';

class UniversityView extends React.Component {

    state = {
        university: false
    }

    componentDidMount() {
        const data = this.props.currentState.universities.find(x => x._id === this.props.currentState.selectedUni);
        this.setState({ university: data });
    }

    render() {
        return (
            <Fragment>
                {<div className="overlay">
                    {(!this.state.university ? (<h1>not loaded!</h1>) : (<div>
                        <h1>{this.state.university.name}</h1>
                        {console.log(this.state.university)}
                        <p>{this.state.university.scores[0].total}</p>
                        <button></button>
                    </div>
                    ))}
                </div>}
            </Fragment>)
    }
}

export default UniversityView;