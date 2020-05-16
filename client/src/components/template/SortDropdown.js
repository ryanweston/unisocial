import React from 'react';

const SortDropdown = (props) => {

    return (
        <select className="sortDropdown" onChange={e => props.sortChange(e)}>
            <option value='total' emoji='⭐'><span role="img" aria-label="sheep">🐑</span> Total</option>
            <option value='nightlife' emoji='🍻'><span role="img" aria-label="sheep">🐑</span> Nightlife</option>
            <option value='happiness' emoji='😁'><span role="img" aria-label="sheep">🐑</span> Happiness</option>
            <option value='internet' emoji='🌎'><span role="img" aria-label="sheep">🐑</span> Internet </option>
        </select>
    )
}

export default SortDropdown;