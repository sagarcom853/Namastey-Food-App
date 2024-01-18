import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";

const SearchBar = ({ setTextFieldValue, Err, placeholder, dropdownValue }) => {
  const [showModal, setShowModal] = useState(false)
  const darkMode = useSelector((store) => store?.cart.dark);

  useEffect(() => {
    if (Err !== "") {
      setShowModal(true)
    }
  }, [Err])

  const searchBarClasses = `
    w-64 border outline-none border-gray-300 focus:border-gray-500 px-2 py-2 transition-all duration-300 ${darkMode ? 'darkModeCSS' : ''}`;

  function Debounce(cb, delay) {
    let timer
    return ((...args) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => cb(...args), delay)
    })
  }
  const handleChange = Debounce((e) => {
    if (dropdownValue && dropdownValue.length > 0) {
      setTextFieldValue('')
    }
    setTextFieldValue(e.target.value)
    // onChange(e.target.value);
  }, 500)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap justify-center items-center gap-3">
        <input
          id="filled-search"
          label="Search Restaurants"
          type="text"
          key="search1"
          color="text-black"
          className={searchBarClasses}
          placeholder={placeholder}
          disabled={dropdownValue && dropdownValue.length > 0}
          // value={value}
          // value={textFieldValue}
          name="hello"
          onChange={(e) => handleChange(e)}
        />
      </div>
      {/* {showModal && Err !== "" && (
        <Modal
          modalContent="No Restaurants found for the search!!"
          modalTitle="Not Found"
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )} */}
    </div>
  );
};

export default SearchBar;
