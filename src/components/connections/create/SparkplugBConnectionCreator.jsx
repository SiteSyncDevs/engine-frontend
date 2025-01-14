import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import TextInput from "../../form/TextInput";
import FileUpload from "../../form/FileUpload";
import PopupAlert from "../../utils/PopupAlert/Popup";
import {
  Box,
  Typography,
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  CircularProgress,
  Switch,
} from "@mui/material";
import ApiHandler from "../../../api/ApiHandler";

export default function SparkplugBConnectionCreator() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSparkplugSettings, setShowSparkplugSettings] = useState(false);
  const [useAuthentication, setUseAuthentication] = useState(false);
  const [friendlyName, setFriendlyName] = useState("");
  const [brokerHostname, setBrokerHostname] = useState("");
  const [brokerPort, setBrokerPort] = useState("");
  const [clientCertificate, setClientCertificate] = useState("");
  const [clientKey, setClientKey] = useState("");
  const [serverCertificate, setServerCertificate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sparkplugGroupId, setSparkplugGroupId] = useState("");
  const [sparkplugNodeId, setSparkplugNodeId] = useState("");
  const [errors, setErrors] = useState({});
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
      sparkplugGroupId,
      sparkplugNodeId,
      clientCertificate,
      clientKey,
      serverCertificate,
    };

    try {
      const response = await ApiHandler.post("/routers/v1/connections", formData);
      console.log("Response data from SparkplugBConnectionCreator: ", response);

      // navigate to status page
      navigate("/connections#");
    } catch (error) {
      console.error("Error creating connection: ", error);
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
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
        Create a Sparkplug-B Connection
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
        onClick={() => setShowSparkplugSettings((prev) => !prev)}
      >
        {showSparkplugSettings
          ? "Hide Sparkplug Settings"
          : "Show Sparkplug Settings"}
      </Button>
      <Collapse in={showSparkplugSettings}>
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <TextInput
            label="Group ID"
            name="groupid"
            onChange={(newValue) => {
              setSparkplugGroupId(newValue);
            }}
            fullWidth={false}
          />
          <TextInput
            label="Node ID"
            name="nodeid"
            onChange={(newValue) => {
              setSparkplugNodeId(newValue);
            }}
            fullWidth={false}
          />
        </Box>
      </Collapse>
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
              setSparkplugGroupId(newValue);
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
