import { useState } from "react";
import TextInput from "../../form/TextInput";
import FileUpload from "../../form/FileUpload";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";

export default function SparkplugBConnectionCreator() {
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

  const handleSubmit = () => {
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

    console.log("Form Data:", formData);

    // You can now send this `formData` object to an API or handle it as needed
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Styled Title */}
      <Typography variant="h4" gutterBottom>
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
          }}
        />
        <TextInput
          label="Broker Hostname/IP"
          name="name"
          onChange={(newValue) => {
            setBrokerHostname(newValue);
          }}
        />
        <TextInput
          label="Broker Port"
          name="name"
          onChange={(newValue) => {
            setBrokerPort(newValue);
          }}
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
              }}
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              onChange={(newValue) => {
                setPassword(newValue);
              }}
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
        sx={{ marginTop: 3 }}
      >
        Submit
      </Button>
    </Box>
  );
}
