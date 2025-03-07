import { useState } from "react";
import TextInput from "../../form/TextInput";
import Dropdown from "../../form/Dropdown";
import PopupAlert from "../../utils/PopupAlert/Popup";
import ApiHandler from "../../../api/ApiHandler";
import {
  Box,
  Typography,
  Button,
  Card,
  Collapse,
  Divider,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OpcUaConnectionCreator() {
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [useAuthentication, setUseAuthentication] = useState(false);
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState("");
  const [authType, setAuthType] = useState(""); // Changed from username/password
  const [serverExtension, setServerExtension] = useState(""); // OPC UA Server Extension
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const authOptions = [
    { label: "None", value: "none" },
    { label: "BasicAuth", value: "basic" },
    { label: "Certificate", value: "certificate" },
  ];

  const handleSubmit = async () => {
    const newErrors = {};
    if (!name) newErrors.name = "Connection Name is required";
    if (!ipAddress) newErrors.ipAddress = "IP Address is required";
    if (!port) newErrors.port = "Port is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const formData = {
      ip_address: ipAddress,
      port: parseInt(port, 10), // Convert port to number
      auth: {
        auth_type: useAuthentication ? authType : "none",
      },
      protocol: "opcua",
      isActive: true,
      name: name,
      type: "opcua",
      params: {
        server_extension: serverExtension,
      },
    };

    try {
      const response = await ApiHandler.post("/api/v1/connections/create/opcua", formData);
      console.log("Response data from OpcUaConnectionCreator: ", response);
      navigate("/connections#");
    } catch (error) {
      console.error("Failed to create OPC-UA connection: ", error);
      setAlert({
        type: "error",
        message: "Error Creating Connection. Please Try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Popup Alert */}
      {alert && (
        <PopupAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
      )}

      <Typography variant="h4" gutterBottom>
        OPC-UA Connection Creator
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

      <Box display="flex" flexDirection="column" gap={2} maxWidth="600px">
        <TextInput
          label="Connection Name"
          name="name"
          onChange={(newValue) => {
            setName(newValue);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextInput
          label="IP Address"
          name="ipAddress"
          onChange={(newValue) => {
            setIpAddress(newValue);
            setErrors((prev) => ({ ...prev, ipAddress: "" }));
          }}
          error={!!errors.ipAddress}
          helperText={errors.ipAddress}
        />
        <TextInput
          label="Port"
          name="port"
          type="number"
          onChange={(newValue) => {
            setPort(newValue);
            setErrors((prev) => ({ ...prev, port: "" }));
          }}
          error={!!errors.port}
          helperText={errors.port}
        />

        {/* Use Authentication Toggle */}
        <FormControlLabel
          control={<Switch checked={useAuthentication} onChange={() => setUseAuthentication((prev) => !prev)} />}
          label="Use Authentication"
        />

        {/* Authentication Type Dropdown */}
        <Collapse in={useAuthentication}>
          <Dropdown
            label="Authentication Type"
            value={authType}
            options={authOptions}
            onChange={(value) => setAuthType(value)}
          />
        </Collapse>

        {/* Advanced Settings Toggle */}
        <Button variant="text" sx={{ marginTop: 2 }} onClick={() => setShowAdvanced((prev) => !prev)}>
          {showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings"}
        </Button>

        {/* Advanced Settings */}
        <Collapse in={showAdvanced}>
          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            <TextInput
              label="Server Extension"
              name="serverExtension"
              onChange={(newValue) => setServerExtension(newValue)}
            />
          </Box>
        </Collapse>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
        sx={{ marginTop: 3 }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={24} sx={{ marginRight: 1 }} color="inherit" />
            Creating...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </Box>
  );
}
