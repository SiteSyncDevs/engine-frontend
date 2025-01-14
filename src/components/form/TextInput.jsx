import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  fullWidth = true,
  password = false,
  type = "text",
  error = false,
  helperText = ""
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  // Handle changes to the input value
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="mt-2">
      <h1 className="mb-1">{label}</h1>
      
      <TextField
        // label={label}
        type={type}
        size="small"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        fullWidth={fullWidth}
        variant="outlined"
        error={error}
        helperText={error ? helperText : ""}
      />
    </div>
  );
};

export default TextInput;