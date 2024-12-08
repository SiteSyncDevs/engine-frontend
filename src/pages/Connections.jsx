import { useState, useEffect } from "react";
import ConnectionsStatus from "../components/connections/ConnectionsStatus";
import CreateConnectionModal from "../components/connections/CreateConnectionModal";
import NoConnectionsFound from "../components/connections/NoConnectionsFound";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ApiHandler from "../api/ApiHandler";
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

  const [connections, setConnections] = useState([]);
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await ApiHandler.get(`/routers/v1/connections`);
        console.log('Connections:', data);
        setConnections(data);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, []);

  // const connections = [
  //   {
  //     id: 1,
  //     name: "PLC Logix",
  //     description:
  //       "Puts valve position data into the distallation tower's PLC register.",
  //     protocol: "TCP",
  //     address: "192.168.1.1",
  //     connected: true,
  //     lastStatusCheck: "2024-11-01 17:32:21",
  //   },
  //   {
  //     id: 2,
  //     name: "Aloxy.Core",
  //     description: "Aloxy Webhook Integration.",
  //     protocol: "HTTPS",
  //     address: "192.168.1.2",
  //     connected: false,
  //     lastStatusCheck: "2024-10-31 12:21:36",
  //   },
  //   {
  //     id: 3,
  //     name: "MQTT",
  //     description: "Connection to external Chariot broker.",
  //     protocol: "MQTT",
  //     address: "192.168.1.3",
  //     connected: true,
  //     lastStatusCheck: "2024-11-22 01:05:21",
  //   },
  //   {
  //     id: 3,
  //     name: "MQTT",
  //     description: "Connection to external Chariot broker.",
  //     protocol: "MQTT",
  //     address: "192.168.1.3",
  //     connected: true,
  //     lastStatusCheck: "2024-11-22 01:05:21",
  //   },
  //   {
  //     id: 3,
  //     name: "MQTT",
  //     description: "Connection to external Chariot broker.",
  //     protocol: "MQTT",
  //     address: "192.168.1.3",
  //     connected: true,
  //     lastStatusCheck: "2024-11-22 01:05:21",
  //   },
  //   {
  //     id: 3,
  //     name: "MQTT",
  //     description: "Connection to external Chariot broker.",
  //     protocol: "MQTT",
  //     address: "192.168.1.3",
  //     connected: true,
  //     lastStatusCheck: "2024-11-22 01:05:21",
  //   },
  //   {
  //     id: 3,
  //     name: "MQTT",
  //     description: "Connection to external Chariot broker.",
  //     protocol: "MQTT",
  //     address: "192.168.1.3",
  //     connected: true,
  //     lastStatusCheck: "2024-11-22 01:05:21",
  //   },
  //   {
  //     id: 3,
  //     name: "MQTT",
  //     description: "Connection to external Chariot broker.",
  //     protocol: "MQTT",
  //     address: "192.168.1.3",
  //     connected: true,
  //     lastStatusCheck: "2024-11-22 01:05:21",
  //   },
  //   {
  //     id: 3,
  //     name: "MQTT",
  //     description: "Connection to external Chariot broker.",
  //     protocol: "MQTT",
  //     address: "192.168.1.3",
  //     connected: true,
  //     lastStatusCheck: "2024-11-22 01:05:21",
  //   },
    // Add more connections as needed
 // ];

  const [value, setValue] = useState(0);

  // empty first index to prevent having to go back twice
  const tabHashes = ["", "#add-connection", "#item-three"];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    window.location.hash = tabHashes[newValue];
  };
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const newValue = tabHashes.indexOf(hash);
      if (newValue >= 0) {
        setValue(newValue);
      }
    };

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Set the initial tab based on the URL hash
    handleHashChange();

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div>
 

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
          {connections.length > 0 ? <ConnectionsStatus connections={connections} />: <NoConnectionsFound/>}
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
