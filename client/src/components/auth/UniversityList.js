import React from 'react';
import axios from 'axios';

class UniversityList extends React.Component {
    state = {
        loading: true,
        options: [null]
    }

    async componentDidMount() {
        const response = await axios.get('/api/university');
        const string = JSON.stringify(response.data.list);
        const uni = JSON.parse(string);
        this.setState({ options: uni, loading: false });
        console.log(this.state.options);
        console.log('loading: ' + this.state.loading);
    }


    render() {
        return (
            <div>
                {this.state.loading || !this.state.options ? (
                    <div>loading...</div>
                ) : (<div>
                    <select>{
                        this.state.options.map((obj) => {
                            return <option value={obj._id}>{obj.name}</option>
                        }
                        )
                    }</select>
                </div>)}


            </div>
        )
    }
}

export default UniversityList;