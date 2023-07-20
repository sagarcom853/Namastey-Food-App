import React from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const FilterDropdown = ({labelNamesArray,handleInputChange}) => {
  return (
    <div>
        <Autocomplete
          color="secondary"
          id="country-select-demo"
          sx={{ width: 200}}
          options={labelNamesArray}
          autoHighlight
          getOptionLabel={(option) => option.label}
          clearOnEscape={true}
          loading={true}
          loadingText = 'Loading ....'
          onChange={handleInputChange}
          // clearIcon={true}
          
          renderOption={(props, option) => (
            <Box
              color="secondary"
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0, display:'block' } }}
              {...props}
            >
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose an Hotel to order"
              color="secondary"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
    </div>
  )
}

export default FilterDropdown