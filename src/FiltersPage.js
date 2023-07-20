import React from "react";
import FilterSlider from "./FilterSlider";
import FilterDropdown from "./FilterDropdown";
import SearchBar from "./SearchBar";
import { Button } from "@mui/material";

const FiltersPage = ({
  marks,
  handleChange,
  valuetext,
  value,
  HighestPriceValue,
  priceFilter,
  labelNamesArray,
  handleInputChange,
  textFieldValue,
  handleSearchChange,
  setTextFieldValue,
  handleTopRestaurants,
  topRated,
}) => {
  return (
    <div>
      <div className="flex flex-wrap m-4 p-2 gap-3 items-center">
        <FilterSlider
          marks={marks}
          handleChange={handleChange}
          valuetext={valuetext}
          value={value}
          HighestPriceValue={HighestPriceValue}
          priceFilter={priceFilter}
        />
        <FilterDropdown
          labelNamesArray={labelNamesArray}
          handleInputChange={handleInputChange}
        />
        <SearchBar
          textFieldValue={textFieldValue}
          handleSearch={handleSearchChange}
          setTextFieldValue={setTextFieldValue}
        />
        <button
          className="rounded-md p-2 bg-pink-400 w-36" 
          onClick={handleTopRestaurants}
        >
          {topRated ? <p>View all</p> : <p>View Top Rated</p>}
        </button>
      </div>
    </div>
  );
};

export default FiltersPage;
