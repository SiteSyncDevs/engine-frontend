import { useState } from "react";
import TextInput from "../../form/TextInput";
import FileUpload from "../../form/FileUpload";
import {
  Box,
  Typography,
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ApiHandler from "../../../api/ApiHandler";
import PopupAlert from "../../utils/PopupAlert/Popup";

export default function MqttConnectionCreator() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [useAuthentication, setUseAuthentication] = useState(false);
  const [friendlyName, setFriendlyName] = useState("");
  const [brokerHostname, setBrokerHostname] = useState("");
  const [brokerPort, setBrokerPort] = useState("");
  const [clientCertificate, setClientCertificate] = useState("");
  const [clientKey, setClientKey] = useState("");
  const [serverCertificate, setServerCertificate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mqttClientId, setMqttClientId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async () => {
    const newErrors = {};

    if (!friendlyName) newErrors.friendlyName = "Friendly Name is required";
    if (!brokerHostname) newErrors.brokerHostname = "Broker Hostname is required";
    if (!brokerPort) newErrors.brokerPort = "Broker port is required";
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
      brokerHostname,
      brokerPort,
      useAuthentication,
      username: useAuthentication ? username : null,
      password: useAuthentication ? password : null,
      mqttClientId,
      clientCertificate,
      clientKey,
      serverCertificate,
    };

    try {
      const response = await ApiHandler.pose("/routes/v1/connections", formData);
      console.log("Response data from MqttConnectionCreator: ", response);

      // navigate to status page
      navigate("/connections#");
    } catch (error) {
      console.error("Failed to create connection to device: ", error);
      setAlert({
        type: "error",
        message: "Error Creating Connection. Please Try again."
      });
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
        MQTT Connection Creator
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
          label="Broker Hostname/IP"
          name="name"
          onChange={(newValue) => {
            setBrokerHostname(newValue);
            setErrors((prev) => ({ ...prev, brokerHostname: "" }));
          }}
          error={!!errors.brokerHostname}
          helperText={errors.brokerHostname}
        />
        <TextInput
          label="Broker Port"
          name="name"
          onChange={(newValue) => {
            setBrokerPort(newValue);
            setErrors((prev) => ({ ...prev, brokerPort: "" }));
          }}
          error={!!errors.brokerPort}
          helperText={errors.brokerPort}
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
                setErrors((prev) => ({ ...prev, username: "" }))
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
          <FileUpload
            label="Client Certificate"
            name="certificate"
            onFileUpload={(name, contents) => {
              setClientCertificate(contents);
            }}
          />
          <FileUpload
            label="Client Key"
            name="certificate"
            onFileUpload={(name, contents) => {
              setClientKey(contents);
            }}
          />
          <FileUpload
            label="Server Certificate"
            name="certificate"
            onFileUpload={(name, contents) => {
              setServerCertificate(contents);
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
