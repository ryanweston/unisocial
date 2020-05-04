import React, { Fragment, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import PropTypes from 'prop-types'
import UniversityView from './UniversityView';
import { connect } from 'react-redux';


const Landpage = (props) => {

    const [modalInfo, modalChange] = useState({
        modalOpen: false,
        details: null
    })

    const openSelection = (e) => {
        const selected = e.currentTarget.value;
        const data = props.universities[0].find(x => x._id === selected);
        handleModalOpen(data);
        // modalChange({ ...modalInfo, details: data })
    }

    const handleModalOpen = (data) => {
        modalChange((prevState) => {
            return {
                modalOpen: !prevState.modalOpen,
                details: data
            }
        })
    }

    console.log(modalInfo);

    return (
        (!props.loading ? (
            < Fragment >
                <Fragment>
                    <UniversityView
                        details={modalInfo.details}
                        // selected={this.state.selectedUni}
                        currentState={modalInfo.modalOpen}
                        handleModalOpen={handleModalOpen}>
                    </UniversityView >
                </Fragment>
                < div className="container" >
                    <section className="landing">
                        {props.universities[0].map((obj, index) => {
                            return <button key={index} value={obj._id} onClick={e => { openSelection(e) }}>
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
                </div >
            </Fragment >
        ) : (<div><h1>LOADING</h1></div>))
    )
}


Landpage.protoTypes = {
    fetchUni: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        loading: state.uniFetch.loading,
        universities: state.uniFetch.universities
    }
};

export default connect(mapStateToProps)(Landpage);
