import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import UniversityView from './UniversityView';


class Landpage extends React.Component {

    state = {
        universities: [],
        modalOpen: false,
        details: null
    }

    async componentDidMount() {
        const res = await axios.get('api/reviews');
        const string = JSON.stringify(res.data.reviews);
        const reviews = JSON.parse(string);
        this.setState({ universities: reviews });
    }

    openSelection = (e) => {
        const selected = e.currentTarget.value;
        const data = this.state.universities.find(x => x._id === selected);
        this.setState({details: data});
        this.handleModalOpen();
    }

    clearSelected = () => {
        this.setState({details: null})
    }

    handleModalOpen = () => {
        this.setState((prevState) => {
            return {
                modalOpen: !prevState.modalOpen,
            }
        })
        console.log(this.state)
    }

    render() {
        return (
            <Fragment>
                <Fragment>
                        <UniversityView
                        details={this.state.details}
                        // selected={this.state.selectedUni}
                        currentState={this.state.modalOpen} 
                        handleModalOpen={this.handleModalOpen}
                        clearSelected={this.clearSelected}> 
                        </UniversityView >
                </Fragment>
                <div className="container">
                    <section key={this.state.universities} className="landing">
                        {this.state.universities.map((obj, index) => {
                            return <button key={index} value={obj._id} onClick={e => {this.openSelection(e)}}>
                                <div className="university" key={index}>
                                    <div className="name" key={obj._id}>{obj.name}</div>
                                    {obj.scores.map((points) => {
                                        return <div className="points" key={index}> {points.total} </div>
                                    }
                                    )}
                                </div>
                            </button>
                        })}
                    </section>
                </div>
            </Fragment>
        )
    }
}

export default Landpage;
