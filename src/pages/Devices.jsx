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

  const handleSubmit = () => {
    console.log("Submit button clicked");
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
