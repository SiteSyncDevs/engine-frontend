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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OpcUaConnectionCreator() {
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [useAuthentication, setUseAuthentication] = useState(false);
  const [friendlyName, setFriendlyName] = useState("");
  const [discoveryUrl, setDiscoveryUrl] = useState("");
  const [endpointUrl, setEndpointUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mqttClientId, setMqttClientId] = useState("");
  const [securityMode, setSecurityMode] = useState("");
  const [securityPolicy, setSecurityPolicy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const securityModeOptions = [
    { label: "None", value: "none" },
    { label: "Sign", value: "sign" },
    { label: "SignAndCrypt", value: "signandcrypt" },
  ]

  const securityPolicyOptions = [
    { label: "None", value: "none" },
    { label: "Basic128Rsa15", value: "Basic128Rsa15" },
    { label: "Basic256", value: "Basic256" },
    { label: "Basic256Sha256", value: "Basic256Sha256" },
    { label: "Aes128_Sha256_RsaOaep", value: "Aes128_Sha256_RsaOaep" },
    { label: "Aes128_Sha256_RsaPss", value: "Aes128_Sha256_RsaPss" },
  ]

  const handleSubmit = async () => {
    const newErrors = {};

    if (!friendlyName) newErrors.friendlyName = "Friendly Name is required";
    if (!discoveryUrl) newErrors.discoveryUrl = "Discovery URL is required";
    if (!endpointUrl) newErrors.endpointUrl = "Endpoint URL is required";
    if (useAuthentication) {
      if (!username) newErrors.username = "Username is required";
      if (!password) newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const formData = {
      friendlyName,
      discoveryUrl,
      endpointUrl,
      useAuthentication,
      username: useAuthentication ? username : null,
      password: useAuthentication ? password : null,
      mqttClientId,
      securityMode,
      securityPolicy,
    };

    try {
      const response = await ApiHandler.post("/routes/v1/connections", formData);
      console.log("Response data from OpcUaConnectionCreator: ", response);

      // navigate to status page
      navigate("/connections#");
    } catch (error) {
      console.error("Failed to create connection to device: ", error);
      setAlert({
        type: "error",
        message: "Error Creating Connection. Please Try again."
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>


      {/* Popup Alert */}
      {alert && (
        <PopupAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Styled Title */}
      <Typography variant="h4" gutterBottom>
        OPC-UA Connection Creator
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

      {/* Main Form */}
      <Box display="flex" flexDirection="column" gap={2} maxWidth="600px">
        <TextInput
          label="Friendly Name"
          name="name"
          onChange={(newValue) => {
            setFriendlyName(newValue);
            setErrors((prev) => ({ ...prev, friendlyName: "" }));
          }}
          error={!!errors.friendlyName}
          helperText={errors.friendlyName}
        />
        <TextInput
          label="Discovery URL"
          name="name"
          onChange={(newValue) => {
            setDiscoveryUrl(newValue);
            setErrors((prev) => ({ ...prev, discoveryUrl: "" }));
          }}
          error={!!errors.discoveryUrl}
          helperText={errors.discoveryUrl}
        />
        <TextInput
          label="Endpoint URL"
          name="name"
          onChange={(newValue) => {
            setEndpointUrl(newValue);
            setErrors((prev) => ({ ...prev, endpointUrl: "" }));
          }}
          error={!!errors.endpointUrl}
          helperText={errors.endpointUrl}
        />

        {/* Use Authentication Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={useAuthentication}
              onChange={() => setUseAuthentication((prev) => !prev)}
            />
          }
          label="Use Authentication"
        />

        {/* Username and Password Fields */}
        <Collapse in={useAuthentication}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextInput
              label="Username"
              name="username"
              onChange={(newValue) => {
                setUsername(newValue);
                setErrors((prev) => ({ ...prev, username: "" }));
              }}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              onChange={(newValue) => {
                setPassword(newValue);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>
        </Collapse>
      </Box>

      {/* Advanced Settings Toggle */}
      <Button
        variant="text"
        sx={{ marginTop: 2 }}
        onClick={() => setShowAdvanced((prev) => !prev)}
      >
        {showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings"}
      </Button>

      {/* Advanced Settings */}
      <Collapse in={showAdvanced}>
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <TextInput
            label="MQTT Client ID"
            name="clientId"
            onChange={(newValue) => {
              setMqttClientId(newValue);
            }}
            fullWidth={false}
          />
          <Dropdown
            label="Security Mode"
            value={securityMode}
            options={securityModeOptions}
            onChange={(value) => {
              console.log("Selected Value:", value);
              setSecurityMode(value);
            }}
          />
          <Dropdown
            label="Security Policy"
            value={securityPolicy}
            options={securityPolicyOptions}
            onChange={(value) => {
              console.log("Selected Value:", value);
              setSecurityPolicy(value);
            }}
          />
        </Box>
      </Collapse>
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
