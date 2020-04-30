import React from 'react'
import axios from 'axios';

class Landpage extends React.Component {

    state = {
        universities: []
    }

    async componentDidMount() {
        const res = await axios.get('api/reviews');
        const string = JSON.stringify(res.data.reviews);
        const reviews = JSON.parse(string);
        this.setState({ universities: reviews });
        console.log(this.state.universities[1].scores);
    }

    render() {
        return (
            <section className="landing">

                {this.state.universities.map((obj) => {
                    return <div>
                        <div>{obj.name}</div>

                        {obj.scores.map((points) => {
                            return <div>
                                <div> {points.total} </div>
                            </div>
                        }
                        )}
                    </div>
                })}

            </section>
        )
    }
}

export default Landpage;
