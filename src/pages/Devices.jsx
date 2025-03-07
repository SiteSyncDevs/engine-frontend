import { Api } from "@mui/icons-material";
import LoRaDeviceTable from "../components/LoRaDeviceTable";
import ApiHandler from "../api/ApiHandler";
import { useState, useEffect } from "react";
import CustomButton from "../components/form/CustomButton";
import FileUpload from "../components/form/FileUpload";
// const apiDevices = ApiHandler.get("/api/v1/device").then((data) => {
//   console.log("Data:", data);
// }
// );
export default function DeviceManagement() {
  const [apiDevices, setApiDevices] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = await ApiHandler.get("/api/v1/device/mappings");
      console.log("Data:", data);
      //{
      //     "dev_eui": d['dev_eui'],
      //     "name":d['name'],
      //     "device_type":device["deviceType"],
      //     "attribute":t,
      //     "mapping":v

      // }
      const headers = "DevEUI,DeviceName,Source,Destination\n";
      const rows = data
        .map(
          (tag) => `${tag.dev_eui},${tag.name},${tag.attribute},${tag.mapping}`
        )
        .join("\n");
      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `SiteSyncDeviceMapping.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

    // Sample test data
    const testDevices = [
      {
        id: 1,
        name: "Device 1",
        dev_eui: "0001AABBCCDD",
        join_eui: "001122334455",
        app_key: "A1B2C3D4E5F6G7H8",
        device_type: "Sensor",
        last_seen: "2023-10-01 12:00:00",
      },
      {
        id: 2,
        name: "Device 2",
        dev_eui: "0002AABBCCDD",
        join_eui: "001122334456",
        app_key: "A1B2C3D4E5F6G7H9",
        device_type: "Actuator",
        last_seen: "2023-10-01 13:00:00",
      },
      {
        id: 3,
        name: "Device 3",
        dev_eui: "0003AABBCCDD",
        join_eui: "001122334457",
        app_key: "A1B2C3D4E5F6G7H0",
        device_type: "Gateway",
        last_seen: "2023-10-01 14:00:00",
      },
      {
        id: 4,
        name: "Device 4",
        dev_eui: "0003AABBCCDD",
        join_eui: "001122334457",
        app_key: "A1B2C3D4E5F6G7H0",
        device_type: "Gateway",
        last_seen: "2023-10-01 14:00:00",
      },
    ];

  // Fetch devices when the component mounts
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await ApiHandler.get("/api/v1/device");
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

      <div className="p-4 md:p-8">
      <LoRaDeviceTable devices={apiDevices} />

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <CustomButton
          handleSubmit={handleSubmit}
          label="Export Configurations"
          hoverText="Export all device configurations"
        />
        <FileUpload
          label="Upload configuration"
          hoverText="Upload new system configuration"
        />
      </div>
    </div>
    </div>
  );
}
