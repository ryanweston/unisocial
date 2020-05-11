import React from 'react';

const SortDropdown = (props) => {

    return (
        <select className="sortDropdown" onChange={e => props.sortChange(e)}>
            <option value='total' emoji='⭐'>⭐ Total</option>
            <option value='nightlife' emoji='🍻'>🍻 Nightlife</option>
            <option value='happiness' emoji='😁'>😁 Happiness</option>
            <option value='internet' emoji='🌎'>🌎 Internet </option>
        </select>
    )
}

export default SortDropdown;