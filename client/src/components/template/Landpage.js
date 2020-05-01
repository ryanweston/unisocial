import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
// import universityView from './universityView';

class Landpage extends React.Component {

    state = {
        universities: [],
        modalOpen: false
    }

    handleModalOpen = () => {
        this.setState((prevState) => {
            return {
                modalOpen: !prevState.modalOpen

            }
        })
        console.log(this.state.modalOpen);
    }

    async componentDidMount() {
        const res = await axios.get('api/reviews');
        const string = JSON.stringify(res.data.reviews);
        const reviews = JSON.parse(string);
        this.setState({ universities: reviews });
    }

    render() {
        return (
            <div className="container">
                <section key={this.state.universities} className="landing">
                    {this.state.universities.map((obj, index) => {
                        return <button key={index} onClick={this.handleModalOpen}>
                            <div className="university" key={index}>
                                <div className="name" key={obj.id}>{obj.name}</div>
                                {obj.scores.map((points) => {
                                    return <div className="points" key={index}> {points.total} </div>
                                }
                                )}
                            </div>
                        </button>
                    })}
                </section>
            </div>
        )
    }
}

export default Landpage;
