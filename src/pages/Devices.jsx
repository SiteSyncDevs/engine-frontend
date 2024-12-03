import { Api } from "@mui/icons-material";
import LoRaDeviceTable from "../components/LoRaDeviceTable";
import ApiHandler from "../api/ApiHandler";
import { useState, useEffect } from "react";
const devices = [
  {
    id: 1,
    name: "LoRa Device 1",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 2,
    name: "LoRa Device 2",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 3,
    name: "LoRa Device 3",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 4,
    name: "LoRa Device 4",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 5,
    name: "LoRa Device 5",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 6,
    name: "LoRa Device 6",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
  {
    id: 7,
    name: "LoRa Device 7",
    dev_eui: "1234567812345678",
    app_eui: "1234567812345678",
    app_key: "12345678123456781234567812345678",
    last_seen: "2024-11-01 17:32:21",
  },
];

// const apiDevices = ApiHandler.get("/routers/v1/device").then((data) => {
//   console.log("Data:", data);
// }
// );
export default function DeviceManagement() {
  const [apiDevices, setApiDevices] = useState([]);

  // Fetch devices when the component mounts
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await ApiHandler.get("/routers/v1/device");
        console.log("Data:", data);
        setApiDevices(data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, []); // Empty dependency array ensures this runs only once
  return (
    <div>
      <h1>Devices</h1>
      <LoRaDeviceTable devices={apiDevices} />
    </div>
  );
}
