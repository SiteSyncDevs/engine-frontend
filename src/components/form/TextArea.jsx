import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  fullWidth = true,
    password = false,
    type = "text"
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle changes to the input value
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="mt-2 mb-5">
      <h1 className="mb-1">{label}</h1>
      
      <TextField
        // label={label}
        type={type}
        size="Large"
        placeholder={placeholder}
        value={inputValue}
        multiline
        onChange={handleInputChange}
        fullWidth={fullWidth}
        variant="outlined"
      />
    </div>
  );
};

export default TextArea;
