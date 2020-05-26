import React from 'react';
import emojis from './emojis.js';

const SortDropdown = (props) => {



    return (
        <select className="sortDropdown" onChange={e => props.sortChange(e)}>
            {emojis.map((obj, index) => {
                //Remove underscores from types
                let string = obj.type;
                let newString = string.replace(/_/g, " ");
                //Would place emojis in a span, however only strings are permitted and span returns an error message
                return <option value={obj.type} emoji={obj.emoji} key={index}>{obj.emoji} {newString}</option>
            })}
        </select>
    )
}

export default SortDropdown;