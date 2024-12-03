import { useState } from "react";
import TextInput from "../../form/TextInput";
import FileUpload from "../../form/FileUpload";
import Dropdown from "../../form/Dropdown";
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

export default function OpcUaConnectionCreator() {
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

  const [securityMode, setSecurityMode] = useState("");
  const [securityPolicy, setSecurityPolicy] = useState("");
  const handleSubmit = () => {
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
        securityMode,
        securityPolicy,
        
    };

    console.log("Form Data:", formData);

    // You can now send this `formData` object to an API or handle it as needed
  };

  return (
    <Box sx={{ padding: 3 }}>
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
          }}
        />
        <TextInput
          label="Discovery URL"
          name="name"
          onChange={(newValue) => {
            setBrokerHostname(newValue);
          }}
        />
        <TextInput
          label="Endpoint URL"
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
            options={[
              { label: "None", value: "none" },
              { label: "Sign", value: "sign" },
              { label: "SignAndCrypt", value: "signandcrypt" },
            ]}
            onChange={(value) => {
              console.log("Selected Value:", value);
              setSecurityMode(value);
            }}
          />
          <Dropdown
            label="Security Policy"
            value={securityPolicy}
            options={[
              { label: "None", value: "none" },
              { label: "Basic128Rsa15", value: "Basic128Rsa15" },
              { label: "Basic256", value: "Basic256" },
              { label: "Basic256Sha256", value: "Basic256Sha256" },
              {
                label: "Aes128_Sha256_RsaOaep",
                value: "Aes128_Sha256_RsaOaep",
              },
              { label: "Aes128_Sha256_RsaPss", value: "Aes128_Sha256_RsaPss" },
            ]}
            onChange={(value) => {
              console.log("Selected Value:", value);
              setSecurityPolicy(value);
            }}
          />
          {/* <FileUpload
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
          /> */}
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
