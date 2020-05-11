import React, { Fragment, useState } from 'react';
import UniversityView from './UniversityView';
import { connect } from 'react-redux';
import images from './images.js';
import SortDropdown from './SortDropdown';

const Landpage = (props) => {

    const [modalInfo, modalChange] = useState({
        modalOpen: false,
        details: null,

    })

    const [sort, sortSelect] = useState({
        type: 'total'
    });

    const openSelection = (e) => {
        const selected = e.currentTarget.value;
        const data = universityCheck.find(x => x._id === selected);
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

    const changeSort = (e) => sortSelect({ type: e.target.value })

    console.log(modalInfo);
    const universityCheck = [];
    if (!props.loading) {
        function universityChecker() {
            for (var i = 0; i < props.universities[0].length; i++) {
                var obj = props.universities[0][i];
                universityCheck.push(obj);
            }
        }

        function sortBy(type) {
            return function (a, b) {
                return a.scores[type] > b.scores[type] ? -1 : 1;
            }
        }
        universityChecker();


        universityCheck.sort(sortBy(sort.type));

    }

    console.log(sort.type);

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
                    <h1>FIND YOUR UNIVERSITY BASED ON SOCIAL SCORE & QUALITY OF LIFE FEEDBACK FROM REAL STUDENTS</h1>
                    <SortDropdown sortChange={changeSort} />
                </div>
                <div>

                </div>
                < div className="gridContainer" >
                    <section className="landing">

                        {universityCheck.map((obj, index) => {
                            const uniImage = images.filter(images => images.id === obj.img);
                            return <button className="universityContainer" key={index} value={obj._id} onClick={e => { openSelection(e) }}>
                                <img src={uniImage[0].src}></img>
                                <div className="name" key={obj._id}>
                                    <p>#{index + 1}  {obj.name}</p>
                                </div>
                                <div className="points" key={index}> <b> {sort.type}: {obj.scores.total.toFixed(2)} / 5</b> </div>
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
