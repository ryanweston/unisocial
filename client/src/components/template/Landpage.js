import React, { Fragment, useState } from 'react';
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

        //Renders landpage after app level state fetch has been returned
        (!props.loading ? (
            < Fragment >
                <Fragment>
                    <UniversityView
                        details={modalInfo.details}
                        currentState={modalInfo.modalOpen}
                        handleModalOpen={handleModalOpen}>
                    </UniversityView >
                </Fragment>
                <div className="header">
                    <h1>FIND YOUR UNIVERSITY BASED ON SOCIAL SCORES
& QUALITY OF LIFE FEEDBACK FROM REAL STUDENTS</h1>
                </div>
                < div className="gridContainer" >
                    <section className="landing">
                        {props.universities[0].map((obj, index) => {
                            return <button className="universityContainer" key={index} value={obj._id} onClick={e => { openSelection(e) }}>
                                <div className="name" key={obj._id}>
                                    <p>{obj.name}</p>
                                </div>
                                {obj.scores.map((points) => {
                                    return <div className="points" key={index}> <b>{points.total.toFixed(2)}</b> </div>
                                }
                                )}
                            </button>
                        })}
                    </section>
                </div >
            </Fragment >
        ) : (<div><h1>LOADING</h1></div>))
    )
}


const mapStateToProps = state => {
    return {
        loading: state.uniFetch.loading,
        universities: state.uniFetch.universities
    }
};

export default connect(mapStateToProps)(Landpage);
