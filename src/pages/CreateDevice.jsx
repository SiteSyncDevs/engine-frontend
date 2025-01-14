import React, { useState, useEffect } from "react";
import BulkUploader from "../components/BulkUploader";
import { Modal, Button, useMediaQuery } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";
import ApiHandler from "../api/ApiHandler";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CreateDeviceForm from "../components/device/DeviceCreationForm";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CreateDevice() {
  const [value, setValue] = React.useState(0);
  const [deviceProfiles, setDeviceProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [open, setOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanData, setScanData] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen size

  const [device, setDevice] = useState({
    appKey: "",
    devEUI: "",
    appEui: "",
    deviceProfile: "",
    deviceName: "",
  });

  useEffect(() => {
    const fetchDeviceProfiles = async () => {
      console.log("Fetching device profiles...");
      try {
        const deviceProfilesRes = await ApiHandler.get(
          "/routers/v1/device-profile"
        );
        const transformedProfiles = deviceProfilesRes.map((profile) => ({
          value: profile.id,
          label: profile.name,
        }));
        setDeviceProfiles(transformedProfiles);
        console.log("Device Profiles:", transformedProfiles);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch device profiles:", error);
      } finally {
        // setIsLoading(false); // Update loading state
      }
    };

    fetchDeviceProfiles();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setIsScanning(true); // Start scanning when modal opens
  };

  const handleClose = () => {
    setOpen(false);
    setIsScanning(false); // Stop scanning when modal closes
  };

  const findDeviceProfileID = (name) => {
    const profile = deviceProfiles.find((profile) => profile.label === name);
    return profile ? profile.value : null;
  };

  const generateDeviceName = (deviceProfileName) => {
    const lastFour = device.devEUI.slice(-4); // Last 4 characters of devEUI
    console.log(`${deviceProfileName}-${lastFour}`)
    return `${deviceProfileName}-${lastFour}`;
  };

  const handleScan = (result) => {
    if (result) {
      console.log("QR Code Result:", result[0].rawValue);
      const scanLocal = result[0].rawValue;
      setScanData(result[0].rawValue);

      const parts = scanLocal.split(":");

      if (parts.length !== 4) {
        console.error("Invalid QR code data");
        return;
      }

      const app_key = parts[0];
      const dev_eui = parts[1];
      const deviceProfileName = parts[2];
      const join_eui = parts[3];
      console.log(app_key, dev_eui, deviceProfileName, join_eui);
      setDevice({
        appKey: app_key,
        devEUI: dev_eui,
        appEui: join_eui,
        deviceProfile: findDeviceProfileID(deviceProfileName),
        deviceName: generateDeviceName(deviceProfileName),
      });

      handleClose(); // Close scanner and modal
    }
  };

  if (isLoading) {
    return <p>Loading device profiles...</p>; // Display loading message
  }

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            aria-label="basic tabs example"
          >
            <Tab label="Add Device" {...a11yProps(0)} />
            <Tab label="Upload" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={1}>
          <BulkUploader deviceProfiles={deviceProfiles} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={0}>
          <Button onClick={handleOpen}>Scan QR Code</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.85)", // Dark background
              }}
            >
              <div
                style={{
                  width: isMobile ? "100%" : "80%",
                  height: isMobile ? "100%" : "80%",
                  backgroundColor: "white",
                  borderRadius: isMobile ? "0" : "8px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {isScanning && (
                  <Scanner
                    onScan={handleScan}
                    onError={(error) =>
                      console.error("QR Scanner Error:", error)
                    }
                  />
                )}
              </div>
            </div>
          </Modal>
          <CreateDeviceForm device={device} deviceProfiles={deviceProfiles} />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
