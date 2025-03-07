import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import ApiHandler from "../../../api/ApiHandler"
export default function ConnectionTester({ deviceData }) {
  // Change device to use state
  const [device, setDevice] = useState({
    device_name: "Test Device",
    dev_eui: "1234567890ABCDEF",
    base_64_payload: "SGVsbG8=",
    decoded_payload: {},
    device_profile_id: "profile-xyz",
    fPort: 10,
    time: "2025-03-05T12:00:00Z",
    path: "/sensor/data",
    decoded_attributes: [
      { decoded_attribute: "Temperature", destination_path: "" },
      // { decoded_attribute: "Humidity", destination_path: "/sensor/humidity" },
    ],
  });
  const [jsonError, setJsonError] = useState(null);
  const [decodedPayload, setDecodedPayload] = useState(); 
  const [valueToInject, setValueToInject] = useState(); 
  const [destinationPath, setDestinationPath] = useState(); 

  const handleChange = (field, value) => {
    setDevice((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...device.decoded_attributes];
    updatedAttributes[index][field] = value;
    setDevice((prev) => ({
      ...prev,
      decoded_attributes: updatedAttributes,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      "value_to_inject": valueToInject,
      "destination_path": destinationPath,
    }
    
    const response = await ApiHandler.post("/api/v1/exporter/test-active", payload);
  }

  // Add new function to add attribute
  const handleAddAttribute = () => {
    setDevice(prev => ({
      ...prev,
      decoded_attributes: [
        ...prev.decoded_attributes,
        { decoded_attribute: "", destination_path: "" }
      ]
    }));
  };

  // Add new function to remove attribute
  const handleRemoveAttribute = (indexToRemove) => {
    setDevice(prev => ({
      ...prev,
      decoded_attributes: prev.decoded_attributes.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Modify the handleJsonInput function
  const handleJsonInput = (value) => {
    try {
      // const parsedJson = JSON.parse(value);
      setDevice(prev => ({
        ...prev,
        decoded_payload: value, // Store the entire JSON object in decoded_payload
      }));
      setJsonError(null);
    } catch (error) {
      setJsonError("Invalid JSON format");
    }
  };

  return (
    <Card sx={{ maxWidth: 1200, margin: "auto", mt: 4, p: 3 }}>
      <CardContent>
        {/* Main container for side-by-side layout */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Left side - JSON Input */}
          {/* <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              Device Details
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={20}
              label="Device JSON"
              placeholder="Paste device JSON here..."
              onChange={(e) => setDecodedPayload(e.target.value)}
              // value={JSON.stringify(device.decoded_payload, null, 2) || ''} // Show decoded_payload content
              error={Boolean(jsonError)}
              helperText={jsonError}
              sx={{ fontFamily: 'monospace' }}
            />
          </Box> */}

          {/* Right side - Decoded Attributes */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Decoded Attributes
              </Typography>
              {/* <Button
                variant="contained"
                size="small"
                onClick={handleAddAttribute}
              >
                Add Attribute
              </Button> */}
            </Box>
            <Stack spacing={2}>
              {device.decoded_attributes.map((attr, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    position: 'relative'
                  }}
                >
                  <TextField
                    fullWidth
                    label="Value to send"
                    value={valueToInject}
                    onChange={(e) =>
                      setValueToInject(e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="Destination Path"
                    value={destinationPath}
                    onChange={(e) =>
                      setDestinationPath(e.target.value)
                    }
                  />
                  {/* <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: -12,
                      minWidth: '30px',
                      width: '30px',
                      height: '30px',
                      p: 0,
                      borderRadius: '50%'
                    }}
                    onClick={() => handleRemoveAttribute(index)}
                  >
                    ×
                  </Button> */}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
