import React, { Fragment } from 'react';


// Move data fetching to parent component and pass data down through the use of props
// Research into redux store for state management

class UniversityList extends React.Component {

    // state = {
    //     loading: true,
    //     options: [null],
    //     selected: ''
    // }

    // componentDidMount function is called once after all the components and subcomponents have been rendered
    // best to make api calls within this react function as given component will have alread been mounted
    // and everything will be available to the DOM.
    // async componentDidMount() {
    //     const response = await axios.get('/api/university');
    //     // Recieved errors in get reponse, had to convert to string to place in JS object array.
    //     const string = JSON.stringify(response.data.list);
    //     const uni = JSON.parse(string);
    //     // Fills options with JSON request then sets loading to false which can be checked against
    //     this.setState({ options: uni, loading: false });
    //     console.log(this.state.options);
    // }


    render() {
        // if (this.props.state.loading === false) {
        //     console.log(this.props.state);
        // }
        return (

            <Fragment>
                {this.props.state.loading || !this.props.state.options ? (
                    <div>loading...</div>
                ) : (<div>
                    <label>University</label>
                    <select onChange={e => this.props.onValueChange(e)}>{
                        // map takes in the recieved university data, for each producing an option for the dropdown
                        this.props.state.options.map((obj, index) => {
                            return <option key={index} value={obj._id}> {obj.name}</option>
                        }
                        )
                    }</select>
                </div>)
                }
            </Fragment>
        )
    }
}

export default UniversityList;