import React, { useState, useEffect } from "react";
import BulkUploader from "../components/BulkUploader";
import { Modal, Button, useMediaQuery } from "@mui/material";
import ApiHandler from "../api/ApiHandler";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CreateDeviceForm from "../components/device/DeviceCreationForm";
import QrScanner from "../components/QrScanner";
import PopupAlert from "../components/utils/PopupAlert/Popup";
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
  const [alert, setAlert] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  
  const [device, setDevice] = useState({
    appKey: "",
    devEUI: "",
    appEui: "",
    deviceProfile: "",
    deviceName: "",
  });
  
  const [errors, setErrors] = useState({
    appKey: false,
    devEUI: false,
    appEui: false,
    deviceProfile: false,
    deviceName: false,
  });
  
  useEffect(() => {
    const fetchDeviceProfiles = async () => {
      console.log("Fetching device profiles...");
      try {
        const deviceProfilesRes = await ApiHandler.get(
          "/api/v1/device-profile"
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
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
    setIsScanning(true); // Start scanning when modal opens
  };

  const findDeviceProfileID = (name) => {
    const profile = deviceProfiles.find((profile) => profile.label === name);
    return profile ? profile.value : null;
  };

  const generateDeviceName = (dev_eui, deviceProfileName) => {
    //get last 4 characters of devEUI
    const lastFour = dev_eui.slice(-4);
    return `${deviceProfileName}-${lastFour}`;
  };

  const handleClose = () => {
    setOpen(false);
    setIsScanning(false); // Stop scanning when modal closes
  };

  const handleScan = (result) => {
    if (result) {
      try {
        console.log("QR Code Result:", result);
        const scanLocal = result;
        setScanData(result);
        console.log(scanData);

        const parts = scanLocal.split(":");

        if (parts.length !== 4) {
          console.error("Invalid QR code data");
          setErrors({
            appKey: true,
            devEUI: true,
            appEui: true,
            deviceProfile: true,
            deviceName: true,
          });
          handleClose();
          setAlert({
            type: "error",
            message: "Invalid QR Code. Please Try again."
          });
          return;
        }
        const app_key = parts[0];
        const dev_eui = parts[1];
        const deviceProfileName = parts[2];
        const join_eui = parts[3];

        console.log(app_key);
        console.log(dev_eui);
        console.log(deviceProfileName);
        console.log(join_eui);

        setDevice({
          appKey: app_key,
          devEUI: dev_eui,
          appEui: join_eui,
          deviceProfile: findDeviceProfileID(deviceProfileName),
          deviceName: generateDeviceName(dev_eui, deviceProfileName),
        });

        setErrors({
          appKey: false,
          devEUI: false,
          appEui: false,
          deviceProfile: false,
          deviceName: false,
        });

        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <p>Loading device profiles...</p>; // Display loading message
  }

  return (
    <div>
      {alert && (
        <PopupAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            aria-label="basic tabs example"
          >
            <Tab label="Add Device" {...a11yProps(0)} />
            <Tab label="Upload" {...a11yProps(1)} />

            {/* <Tab label="Ole Fashioned Way" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={1}>
          <BulkUploader deviceProfiles={deviceProfiles} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={0}>
          <Button onClick={handleOpen}>Scan QR Code</Button>
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
              setIsScanning(false);
            }}
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
                id="scannerd-div"
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
                  <QrScanner handleScan={handleScan} />
                )}
              </div>
            </div>
          </Modal>
          <CreateDeviceForm key={JSON.stringify(device)} device={device} deviceProfiles={deviceProfiles} errors={errors} scanData={scanData}/>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
