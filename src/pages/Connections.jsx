import { useState } from "react";
import ConnectionsStatus from "../components/connections/ConnectionsStatus";
import CreateConnectionModal from "../components/connections/CreateConnectionModal";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ConnectionCreationViewer from "../components/connections/ConnectionCreationViewer";
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

export default function Connections() {
  const connections = [
    {
      id: 1,
      name: "PLC Logix",
      description:
        "Puts valve position data into the distallation tower's PLC register.",
      protocol: "TCP",
      address: "192.168.1.1",
      connected: true,
      lastStatusCheck: "2024-11-01 17:32:21",
    },
    {
      id: 2,
      name: "Aloxy.Core",
      description: "Aloxy Webhook Integration.",
      protocol: "HTTPS",
      address: "192.168.1.2",
      connected: false,
      lastStatusCheck: "2024-10-31 12:21:36",
    },
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
    },
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
    },
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
    },
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
    },
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
    },
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
    },
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
    },
    // Add more connections as needed
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h1>Connections</h1>
      <CreateConnectionModal />

      {/* <ConnectionsStatus connections={connections} /> */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Status" {...a11yProps(0)} />
            <Tab label="Add Connection" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ConnectionsStatus connections={connections} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ConnectionCreationViewer />{" "}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </div>
  );
}
