import { useState } from "react";
import TextInput from "../../form/TextInput";
import FileUpload from "../../form/FileUpload";
import { useEffect } from "react";
  import ApiHandler from "../../../api/ApiHandler";
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
import Dropdown from "../../form/Dropdown";
export default function LogixPlcConnection() {
  const [useAuthentication, setUseAuthentication] = useState(false);
  const [friendlyName, setFriendlyName] = useState("");
  const [plc_ip, setplc_ip] = useState("");
  const [plc_port, setplc_port] = useState("");
  const [plcModel, setPlcModel] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [plcOptions, setPlcOptions] = useState([]);


  

  // useEffect(() => {
  //   const fetchPlcOptions = async () => {
  //     try {
  //       const response = await ApiHandler.get("/routers/v1/connections/PLC/options");
  //       setPlcOptions(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch PLC options:", error);
  //     }
  //   };

  //   fetchPlcOptions();
  // }, []);
  const plcOptions = [
    { value: "Logix", label: "Logix" }
  ];
  const handleSubmit = async () => {


    const formData = {
      id: 0,
      connectionName: friendlyName,
      ipaddress: plc_ip,
      port: plc_port,
      useAuthentication,
      username: useAuthentication ? username : null,
      password: useAuthentication ? password : null,
    };

    try {
          const response = await ApiHandler.post("/routers/v1/connections", {
            formData
      });
      console.log("Connection created successfully:", response);
      //then navigate to status page
    } catch (error) {
      console.error("Failed to create connection device:",formData, error);
    }

    console.log("Form Data:", formData);

    // You can now send this `formData` object to an API or handle it as needed
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Styled Title */}
      <Typography variant="h4" gutterBottom>
        Create a PLC Connection
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
        <Dropdown topLabel="PLC Type" options={plcOptions} value={plcModel} showTopLabel={true} onChange={(value) => setPlcModel(value)}/>
        <TextInput
          label="PLC IP"
          name="name"
          onChange={(newValue) => {
            setplc_ip(newValue);
          }}
        />
        <TextInput
          label="PLC Port"
          name="name"
          onChange={(newValue) => {
            setplc_port(newValue);
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
