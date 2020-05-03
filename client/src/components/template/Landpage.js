import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import PropTypes from 'prop-types'
import UniversityView from './UniversityView';
import { connect } from 'react-redux';
import { fetchUni } from '../../actions/university';



class Landpage extends React.Component {

    state = {
        universities: [],
        modalOpen: false,
        details: null
    }

    componentDidMount() {
        this.props.dispatch(fetchUni());
    }

    openSelection = (e) => {
        const selected = e.currentTarget.value;
        const data = this.state.universities.find(x => x._id === selected);
        this.setState({ details: data });
        this.handleModalOpen();
    }

    clearSelected = () => {
        this.setState({ details: null })
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
        // console.log(universities);
        return (
            <Fragment>
                {/* <Fragment>
                    <UniversityView
                        details={this.state.details}
                        // selected={this.state.selectedUni}
                        currentState={this.state.modalOpen}
                        handleModalOpen={this.handleModalOpen}
                        clearSelected={this.clearSelected}>
                    </UniversityView >
                </Fragment> */}
                <div className="container">
                    {/* <section key={this.state.universities} className="landing">
                        {this.state.universities.map((obj, index) => {
                            return <button key={index} value={obj._id} onClick={e => { this.openSelection(e) }}>
                                <div className="university" key={index}>
                                    <div className="name" key={obj._id}>{obj.name}</div>
                                    {obj.scores.map((points) => {
                                        return <div className="points" key={index}> {points.total} </div>
                                    }
                                    )}
                                </div>
                            </button>
                        })}
                    </section> */}
                </div>
            </Fragment>
        )
    }
}

Landpage.protoTypes = {
    fetchUni: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    console.log(state);
    return {
        loading: state.fetchUniversity,
        error: state.fetchUniversity
    }
}

// const mapDispatchToProps = dispatch => {
//     // console.log(disp);
//     return {
//         fetchUni
//         // fetchUniBegin,
//         // fetchUniFailure,
//     }
// }

export default connect(mapStateToProps)(Landpage);
