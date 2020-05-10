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

    // if (!props.loading) {
    //     const universityCheck = [];
    //     function universityChecker() {
    //         for (var i = 0; i < props.universities[0].length; i++) {
    //             var obj = props.universities[0][i];
    //             universityCheck.push(obj);
    //         }
    //     }

    //     universityChecker();
    //     if (universityCheck[1]) {
    //         console.log(universityCheck.sort((a, b) => (a.scores[0].nightlife > b.scores[0].nightlife) ? -1 : 1))
    //     }
    //     // console.log(props.universities.sort(compare()))
    //     // const newData = universityCheck.sort((a, b) => (a.scores[0].nightlife > b.scores[0].nightlife) ? -1 : 1);
    //     // console.log(universityCheck[0].scores[0].nightlife);
    //     // universitySort();
    //     // console.log(universitySort);
    // }




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
                                    <p>#{index + 1}  {obj.name}</p>
                                </div>
                                <div className="points" key={index}> <b>{obj.scores.total.toFixed(2)} / 5</b> </div>
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
