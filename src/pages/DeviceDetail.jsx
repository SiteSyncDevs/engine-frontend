import { useParams } from "react-router-dom";
import DeviceDashboard from "../components/device/DeviceDashboard";
import * as React from "react";
import { useState, useEffect } from "react";
import ApiHandler from "../api/ApiHandler";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import KeyValueInput from "../components/form/KeyValueInput";
import CreateDeviceForm from "../components/device/DeviceCreationForm";
// const device = {
//   id: 0,
//   name: "EnersysVoltTemp-0100",
//   deviceType: "EnersysVoltTemp",
//   description: "this is a description of a device",
//   last_seen: "Today",
//   dev_eui: "00018d5c5c8d0100",
// };

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

export default function DeviceDetail() {
  const [value, setValue] = React.useState(0);
  const { deviceId } = useParams();
  const [device, setDevice] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



    // Fetch devices when the component mounts
    useEffect(() => {
      const fetchDevices = async () => {
        try {
         
          const data = await ApiHandler.get( `/routers/v1/device/${deviceId}`);
          console.log("Data:", data);
          setDevice(data);
        } catch (error) {
          console.error("Error fetching devices:", error);
        }
      };
  
      fetchDevices();
    }, []); // Empty dependency array ensures this runs only once

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Data Mapping" {...a11yProps(1)} />
          <Tab label="Configuration" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DeviceDashboard device={device} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <KeyValueInput device={device} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
