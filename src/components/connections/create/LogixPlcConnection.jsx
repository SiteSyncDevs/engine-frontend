import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../form/TextInput";
import {
  Box,
  Typography,
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Dropdown from "../../form/Dropdown";
import ApiHandler from "../../../api/ApiHandler";
import PopupAlert from "../../utils/PopupAlert/Popup";

export default function LogixPlcConnection() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [useAuthentication, setUseAuthentication] = useState(false);
  const [friendlyName, setFriendlyName] = useState("");
  const [plc_ip, setplc_ip] = useState("");
  const [plc_port, setplc_port] = useState("");
  const [plcModel, setPlcModel] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const plcOptions = [{ value: "Logix", label: "Logix" }];

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


  const handleSubmit = async () => {
    const newErrors = {};

    if (!friendlyName) newErrors.friendlyName = "Friendly Name is required";
    if (!plc_ip) newErrors.plc_ip = "PLC IP is required";
    if (!plc_port) newErrors.plc_port = "PLC Port is required";
    if (!plcModel) newErrors.plcModel = "PLC Type is required";
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
      id: 0,
      connectionName: friendlyName,
      ipaddress: plc_ip,
      port: plc_port,
      useAuthentication,
      username: useAuthentication ? username : null,
      password: useAuthentication ? password : null,
    };

    try {
      const response = await ApiHandler.post("/routers/v1/connections", formData);
      console.log("Response data from LogixPIcConnections: ", response);

      // navigate to status page
      navigate("/connections#");
    } catch (error) {
      console.error("Failed to create connection to device: ", formData, error);
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

      {/* Title */}
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
            setErrors((prev) => ({ ...prev, friendlyName: "" }))
          }}
          error={!!errors.friendlyName}
          helperText={errors.friendlyName}
        />
        <Dropdown
          topLabel="PLC Type"
          options={plcOptions}
          value={plcModel}
          showTopLabel={true}
          onChange={(value) => {
            setPlcModel(value);
            setErrors((prev) => ({ ...prev, plcModel: "" }));
          }}
          error={!!errors.plcModel}
          helperText={errors.plcModel}
        />
        <TextInput
          label="PLC IP"
          name="name"
          onChange={(newValue) => {
            setplc_ip(newValue);
            setErrors((prev) => ({ ...prev, plc_ip: "" }));
          }}
          error={!!errors.plc_ip}
          helperText={errors.plc_ip}
        />
        <TextInput
          label="PLC Port"
          name="name"
          onChange={(newValue) => {
            setplc_port(newValue);
            setErrors((prev) => ({ ...prev, plc_port: "" }));
          }}
          error={!!errors.plc_port}
          helperText={errors.plc_port}
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
                setErrors((prev) => ({ ...prev, password: "" }))
              }}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>
        </Collapse>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
        sx={{ marginTop: 3 }}c
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
