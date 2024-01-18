import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const FilterDropdown = ({ labelNamesArray, handleInputChange, Err, textFieldValue, topRated }) => {
  const darkMode = useSelector((store) => store?.cart.dark);

  return (
    <div >
      <label htmlFor='dropDown'></label>
      <select id='dropDown'
        disabled={textFieldValue || topRated}
        className={`border w-64 border-gray-300 focus:border-gray-500 transition-all duration-300 px-2 py-2 outline-none  rounded ${darkMode ? 'darkModeCSS' : ""}`}
        onChange={(e) => handleInputChange(e)}>
        {labelNamesArray?.map((labels) => {
          return <option key={labels}>{labels}</option>
        })}
      </select>
    </div>
  )
}

export default FilterDropdown