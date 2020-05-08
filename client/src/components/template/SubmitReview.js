import React, { useState } from 'react';

const SubmitReview = () => {

    const [formData, setFormData] = useState({
        internet: null,
        nightlife: null,
        happiness: null,
    });

    const changeValue = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const changeColour = e => {
        if (e.target.value >= 0) {
            e.target.className = 'red'
        }
        if (e.target.value >= 1.5) {
            e.target.className = 'orange'
        }
        if (e.target.value >= 3.5) {
            e.target.className = 'green'
        }
    }
    console.log(formData.nightlife);

    return (
        <form>
            <label>🌎 Internet:</label>
            <input name="internet" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
            <label>🍻 Nightlife:</label>
            <input name="nightlife" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
            <label>😆 Happiness</label>
            <input name="happiness" className='default' type="range" min="0.25" max="5" step="0.25" onChange={e => { changeValue(e); changeColour(e) }} />
            <br />
            <input type="submit" />
        </form>
    )
}

export default SubmitReview;