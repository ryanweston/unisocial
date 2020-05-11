import React from 'react';

const SortDropdown = (props) => {
    return (
        <select className="sortDropdown" onChange={e => props.sortChange(e)}>
            <option value='total'>📃 Total</option>
            <option value='nightlife'>🍻 Nightlife</option>
            <option value='happiness'>😁 Happiness</option>
            <option value='internet'>🌎 Internet </option>
        </select>
    )
}

export default SortDropdown;