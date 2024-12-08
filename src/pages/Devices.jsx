import { Api } from "@mui/icons-material";
import LoRaDeviceTable from "../components/LoRaDeviceTable";
import ApiHandler from "../api/ApiHandler";
import { useState, useEffect } from "react";
import CustomButton from "../components/form/CustomButton";
import FileUpload from "../components/form/FileUpload";
// const apiDevices = ApiHandler.get("/routers/v1/device").then((data) => {
//   console.log("Data:", data);
// }
// );
export default function DeviceManagement() {
  const [apiDevices, setApiDevices] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = await ApiHandler.get("/routers/v1/device/mappings");
      console.log("Data:", data);
      //{
    //     "dev_eui": d['dev_eui'],
    //     "name":d['name'],
    //     "device_type":device["deviceType"],
    //     "attribute":t,
    //     "mapping":v

    // }
      const headers = "DevEUI,DeviceName,Source,Destination\n";
      const rows = data.map((tag) => `${tag.dev_eui},${tag.name},${tag.attribute},${tag.mapping}`).join("\n");
      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `SiteSyncDeviceMapping.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setApiDevices(data);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
    
  };
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
      
      <LoRaDeviceTable devices={apiDevices} />

      {/* <CustomButton handleSubmit={handleSubmit} label="Submit" /> */}

      <div className="flex flex-row gap-12  w-1/3 mt-4">
        <CustomButton
          handleSubmit={handleSubmit}
          label="Export Configurations"
          hoverText="Export all device configurations"
        />
        <FileUpload label="Upload configuration" hoverText="Upload new system configuration"/>
      </div>
    </div>
  );
}
