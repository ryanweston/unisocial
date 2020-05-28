import React, { Fragment } from 'react';


// Move data fetching to parent component and pass data down through the use of props
// Research into redux store for state management

class UniversityList extends React.Component {

    render() {
        return (

            <Fragment>
                <div>
                    <select onChange={e => this.props.onValueChange(e)}>
                        {/* Default value for dropdown */}
                        <option value="" selected disabled hidden>Select your university</option>
                        {
                            // map takes in the recieved university data, for each producing an option for the dropdown
                            this.props.options.map((obj, index) => {
                                return <option style={{ fontFamily: "urbane-rounded" }} key={index} value={obj._id}> {obj.name}</option>
                            }
                            )
                        }</select>
                </div>
            </Fragment>
        )
    }
}

export default UniversityList;