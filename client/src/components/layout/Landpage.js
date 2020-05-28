import React, { Fragment, useState } from 'react';
import UniversityView from './UniversityView';
import { connect } from 'react-redux';
import EmojiAnimation from '../general/EmojiAnimation';
import SortDropdown from '../general/SortDropdown';
//Objects containing linked images for universities, 
//and emojis representing datatypes
import images from '../general/images.js';
import emojis from '../general/emojis.js';



const Landpage = (props) => {

    const [modalInfo, modalChange] = useState({
        modalOpen: false,
        details: null,
        img: null,
    })

    const [sort, sortSelect] = useState({
        type: 'total',
    });

    //Runs before state changes to retrieve the data for the selected uni
    const openSelection = (e, img) => {
        const selected = e.currentTarget.value;
        const data = universityCheck.find(x => x._id === selected);
        const imgUrl = img;
        //Now the data has been found and selected, popup can open
        handleModalOpen(data, imgUrl);
    }

    //Handles opening and closing of popup
    const handleModalOpen = (data, imgUrl) => {
        // document.container.classList.add('modal-open');
        //Any hook function will have default parameter that
        //takes in the previous state.
        modalChange((prevState) => {
            return {
                //Reverses the previous state
                modalOpen: !prevState.modalOpen,
                //Fills details with the university data of selected
                details: data,
                img: imgUrl
            }
        })
    }

    //Changes sort state to relevant sort type and it's given emoji 
    const changeSort = (e) => sortSelect({ type: e.target.value, emoji: e.target.emoji });


    // console.log(modalInfo);

    //Functions that pass the fetched university data
    //into an array, allowing the data to be sorted with .sort
    const universityCheck = [];

    //Loading will equal false when all university data has been fetched
    //if statement is needed otherwise this will run without the state data
    if (!props.loading) {

        //Pushes data into an array 
        function universityChecker() {
            for (var i = 0; i < props.universities[0].length; i++) {
                var obj = props.universities[0][i];
                universityCheck.push(obj);
            }
        }

        //This is a callback function that will 
        function sortBy(type) {
            //a and b are the first and second elements for comparison
            //comparing each array index to each other to generate a value of -1 or 1
            //that the sort function will read and reorder the indexs by.
            return function (a, b) {
                //if one is greater that other (by selected type)
                //subtract from their index and place it higher that
                //the other index it was compared too.
                return a.scores[type] > b.scores[type] ? -1 : 1;
            }
        }

        universityChecker();
        universityCheck.sort(sortBy(sort.type));
        // console.log(universityCheck);
    }

    return (
        //Renders landpage after app level state fetch has been returned
        (!props.loading ? (
            < Fragment >
                <Fragment>
                    <UniversityView
                        image={modalInfo.img}
                        details={modalInfo.details}
                        currentState={modalInfo.modalOpen}
                        handleModalOpen={handleModalOpen}>
                    </UniversityView >
                </Fragment>
                <div className="header">
                    <EmojiAnimation>

                    </EmojiAnimation>
                    <h1><span className="highlight">AUTHENTIC UNIVERSITY</span> REVIEWS FOR <span className="highlight">SOCIAL SCORES</span> ON OVER A DOZEN FACTORS</h1>
                </div>
                <div className="landing-container">
                    <SortDropdown sortChange={changeSort} />
                    <section className="grid">
                        {universityCheck.map((obj, index) => {
                            //Returns key and value from images array that matches img id in database
                            const uniImage = images.filter(images => images.id === obj.img);
                            //Returns emoji value from array depending on the sort type
                            const dataEmoji = emojis.filter(emojis => emojis.type === sort.type);

                            // console.log(dataEmoji[0].emoji)

                            //For the top rated university of the relevant sort, set new styles
                            let order = 'uniItem'
                            if (index === 0) {
                                order = 'uniItem first';
                            } else {
                                order = 'uniItem';
                            }

                            let ranking = index + 1;
                            return <button id="list" className={order} key={index} value={obj._id} onClick={e => { openSelection(e, uniImage) }}>
                                <div className="ranking"><p>{(index === 0 ? ('🏆') : ("#" + ranking))}</p></div>
                                <div className="image" style={{ backgroundImage: "url(" + uniImage[0].src + ")" }}>
                                </div>

                                <div className="text">
                                    <div className="name"> <h1>{obj.name}</h1></div>
                                    <div className="score"><p>{dataEmoji[0].emoji} {obj.scores[sort.type].toFixed(2)} / 5</p></div>
                                </div>


                            </button>

                        })}
                    </section>
                </div>
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
