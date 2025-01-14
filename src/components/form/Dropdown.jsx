import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown({
  options,
  label,
  value,
  onChange,
  showTopLabel = false,
  topLabel,
  maxWidth = 300,
}) {
  console.log(options);
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
    <Box sx={{ minWidth: 120, maxWidth: maxWidth, width: 400 }}>
        { topLabel && <h1 className="mb-1">{topLabel}</h1>}
      <FormControl fullWidth>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value || ""}
          label={label}
          onChange={handleChange}
          sx={{}}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
