import React from 'react';
import emojis from './emojis.js';

const SortDropdown = (props) => {



    return (
        <select className="sortDropdown" onChange={e => props.sortChange(e)}>
            {emojis.map((obj, index) => {
                //Would place emojis in a span, however only strings are permitted and span returns an error message
                return <option value={obj.type} emoji={obj.emoji} key={obj.type}>{obj.emoji} {obj.type}</option>
            })}
        </select>
    )
}

export default SortDropdown;