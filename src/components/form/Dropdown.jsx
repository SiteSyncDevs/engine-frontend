import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from '@mui/material/FormHelperText';
import Select from "@mui/material/Select";

import { useTheme } from '@mui/material/styles';

export default function Dropdown({ options, label, value, onChange, showTopLabel = false, topLabel, maxWidth = 300, error = false, helperText = "" }) {

  const theme = useTheme();

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  // if (!Array.isArray(options) || options.length === 0) {
  //   console.log(options)
  //   return <p>loading</p>; // Or return a placeholder element, e.g., <p>Loading options...</p>
  // }
  return (
    <Box className="w-full md:w-auto" sx={{ minWidth: 120, maxWidth: maxWidth }}>
      {topLabel && <h1 className="mb-1">{topLabel}</h1>}
      <FormControl fullWidth>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value || ""}
          label={label}
          onChange={handleChange}
          error={error}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        { /* this is a default error helper text */}
        <FormHelperText sx={{ color: error ? theme.palette.error.main : 'inherit' }} >{helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
}