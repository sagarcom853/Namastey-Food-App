import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({
  setTextFieldValue,
}) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      <div className="searchbar-text">
      <TextField
        id="filled-search"
        label="Search Restaurants"
        type="search"
        key="search"
        color="secondary"
        // value={textFieldValue}
        onChange={(e) => setTextFieldValue(e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{}}
        // autoFocus="autoFocus"
        autoComplete="true"
        // multiline="true"
        // fullWidth="true"
        // margin="normal"
        variant="outlined"
        autohighlight="true"
        //   focused
        // helperText="Find best Restaurants near you"
        // helperTextColor="secondary"
      />
      </div>
    

      <input
         id="filled-search"
         label="Search Restaurants"
         type="text"
         key="search1"
         color="secondary"
         className="h-12"
         placeholder="Search for Restaurants"
         name="hello"
        onChange={(e) => setTextFieldValue(e.target.value)}

      />
    </div>
  );
};

export default SearchBar;




