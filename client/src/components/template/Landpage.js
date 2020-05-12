import React, { Fragment, useState } from 'react';
import UniversityView from './UniversityView';
import { connect } from 'react-redux';
import SortDropdown from './SortDropdown';
//Objects containing linked images for universities, 
//and emojis representing datatypes
import images from './images.js';
import emojis from './emojis.js';



const Landpage = (props) => {

    const [modalInfo, modalChange] = useState({
        modalOpen: false,
        details: null,

    })

    const [sort, sortSelect] = useState({
        type: 'total',
        emoji: '⭐'
    });

    const openSelection = (e) => {
        const selected = e.currentTarget.value;
        const data = universityCheck.find(x => x._id === selected);
        handleModalOpen(data);
    }

    const handleModalOpen = (data) => {
        modalChange((prevState) => {
            return {
                modalOpen: !prevState.modalOpen,
                details: data
            }

        })
    }

    const changeSort = (e) => sortSelect({ type: e.target.value, emoji: e.target.emoji });


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

    // console.log(modalInfo.modelOpen);

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

                <section className="landing">

                    {universityCheck.map((obj, index) => {
                        //Returns key and value from images array that matches img id in database
                        const uniImage = images.filter(images => images.id === obj.img);
                        //Returns emoji value from array depending on the sort type
                        const dataEmoji = emojis.filter(emojis => emojis.type === sort.type);
                        console.log(dataEmoji[0].emoji)

                        return <button className="uniItem" key={index} value={obj._id} onClick={e => { openSelection(e) }}>
                            <div className="ranking"><p>#{index + 1}</p></div>
                            <div className="image" style={{ backgroundImage: "url(" + uniImage[0].src + ")" }}>
                            </div>

                            <div className="text">
                                <div className="name"> <h1>{obj.name}</h1></div>
                                <div className="score"><p>{dataEmoji[0].emoji} {obj.scores[sort.type].toFixed(2)} / 5</p></div>
                            </div>


                        </button>

                    })}
                </section>

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
