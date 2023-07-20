import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";

const FilterSlider = ({
  marks,
  handleChange,
  valuetext,
  value,
  handleBlur,
  HighestPriceValue,
  priceFilter,
  width,
  defaultValue,
  steps,
  valueLabelDisplay,
  color,
  inputClassName,
  max
}) => {
  useEffect(() => {}, [valuetext]);
  const snap = () => {
    return "hello";
  };
  const Input = styled(MuiInput)`
    width: 42px;
  `;

  return (
    <div>
      <Box sx={{ width: width }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs>
            <Slider
              size="small"
              aria-label="Always visible"
              getAriaLabel={snap}
              value={value || typeof priceFilter === "number" ? priceFilter : 0}
              defaultValue={HighestPriceValue || defaultValue}
              onChange={handleChange }
              getAriaValueText={valuetext}
              aria-labelledby="input-slider"
              step={steps || 10}
              marks={marks}
              min={0}
              max={HighestPriceValue || max}
              valueLabelDisplay={valueLabelDisplay || 'auto'}
              color={color || 'secondary'}
            />
          </Grid>
          <Grid item>
            <Input
              className={inputClassName || "ml-4 mb-4"}
              value={priceFilter || value}
              // autoFocus="autoFocus"
              key="filter-slider"
              color={color || 'secondary'}
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{
                step: steps || 10,
                min: 0,
                max: HighestPriceValue || max,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default FilterSlider;
