import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import UniversityView from './universityView';


class Landpage extends React.Component {

    state = {
        universities: [],
        modalOpen: false,
        selectedUni: null
    }

    handleModalOpen = (e) => {
        const selected = e.currentTarget.value;
        // this.setState((e) => {
        //     return { selectedUni: e.currentTarget.value }
        // })
        this.setState((prevState) => {
            return {
                modalOpen: !prevState.modalOpen,
                selectedUni: selected
            }
        })
        console.log(this.state)
    }

    async componentDidMount() {
        const res = await axios.get('api/reviews');
        const string = JSON.stringify(res.data.reviews);
        const reviews = JSON.parse(string);
        this.setState({ universities: reviews });
    }

    render() {
        return (
            <Fragment>
                <Fragment>
                    {!this.state.modalOpen || !this.state.selectedUni ? (
                        <p>Nothing loaded</p>) :
                        (<UniversityView currentState={this.state}> </UniversityView >)}
                </Fragment>
                <div className="container">
                    <section key={this.state.universities} className="landing">
                        {this.state.universities.map((obj, index) => {
                            return <button key={index} value={obj._id} onClick={e => this.handleModalOpen(e)}>
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
