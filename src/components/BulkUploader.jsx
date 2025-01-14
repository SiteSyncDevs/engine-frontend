import UploadFileIcon from "@mui/icons-material/UploadFile";
import { ChangeEvent, useState, useEffect } from "react";
import { Button, Box, Paper } from "@mui/material";
import LoRaDeviceTable from "./LoRaDeviceTable";
import FileUpload from "./form/FileUpload";
const fileTypes = ["CSV"];
import ApiHandler from "../api/ApiHandler";
import { Api } from "@mui/icons-material";
import Dropdown from "./form/Dropdown";

export default function BulkUploader({ deviceProfiles }) {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceProfile, setSelectedDeviceProfile] = useState(null);
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  // const [deviceProfiles, setDeviceProfiles] = useState([]);

  const handleDownloadCSV = () => {
    const headers = "dev_eui,join_eui,app_key,name,description\n";
    const rows = {};
    const csvContent = headers;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `SiteSync-upload-template.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = () => {
    devices.forEach(async (device) => {
      try {
        console.log("Device:", device);
        console.log("Selected Device Profile:", selectedDeviceProfile);
        const newDevice = {
          ...device,
          device_profile_id: selectedDeviceProfile,
        }
        // device.deviceProfileId = selectedDeviceProfile;
        const response = await ApiHandler.post("/routers/v1/device", newDevice);
        console.log("Device uploaded successfully:", response);
      } catch (error) {
        console.error("Failed to upload device:", newDevice, error);
      }
    });
    // const formData = {
    //   devices,
    //   selectedDeviceProfile,
    // };

    // console.log("Form Data:", formData);

    // You can now send this `formData` object to an API or handle it as needed
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileUpload(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  // useEffect(() => {
  //   const fetchDeviceProfiles = async () => {
  //     try {
  //       const deviceProfilesRes = await ApiHandler.get(
  //         "/routers/v1/device-profile"
  //       );
  //       const transformedProfiles = deviceProfilesRes.map((profile) => ({
  //         value: profile.id,
  //         label: profile.name,
  //       }));

  //       setDeviceProfiles(transformedProfiles);
  //       console.log("Device Profiles:", transformedProfiles);
  //     } catch (error) {
  //       console.error("Failed to fetch device profiles:", error);
  //     }
  //   };

  //   fetchDeviceProfiles();
  // }, []);
  // const handleFileUpload = (uploadedFile) => {
  //   setFile(uploadedFile);
  //   console.log("Uploaded File:", uploadedFile);
  // };

  const handleFileUpload = (name, fileContents) => {
    console.log("file");

    setFilename(name);

    const reader = new FileReader();

    const records = parseRawCSV(fileContents);
    console.log("Records:", records);
    setDevices(records);
  };

  const parseRawCSV = (csvString) => {
    try {
      const lines = csvString.split("\n").map((line) => line.trim());

      const header = lines
        .shift()
        ?.split(",")
        .map((h) => h.trim());

      if (!header) {
        throw new Error("CSV file is empty or has no header.");
      }

      // Check for required fields
      const requiredFields = ["dev_eui", "join_eui", "app_key", "name"];
      const missingFields = requiredFields.filter(
        (field) => !header.includes(field)
      );
      if (missingFields.length > 0) {
        throw new Error(
          `Invalid CSV headers. Missing required fields: ${missingFields.join(
            ", "
          )}`
        );
      }

      // Map rows to objects
      const records = lines
        .filter((line) => line) // Skip empty lines
        .map((line) => {
          const values = line.split(",").map((value) => value.trim());
          const record = {};
          header.forEach((key, index) => {
            record[key] = values[index] || null; // Handle missing values
          });

          return {
            device_name: record["name"] || "Unknown Device",
            dev_eui: record["dev_eui"],
            join_eui: record["join_eui"],
            app_key: record["app_key"],
          };
        });

      return records;
    } catch (error) {
      console.error("Error parsing CSV:", error.message);
      return [];
    }
  };

  return (
    <div>
      <FileUpload label="Upload CSV template" onFileUpload={handleFileUpload} />
      <br />
      <button
        onClick={handleDownloadCSV}
        className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md"
      >
        Download Upload Template
      </button>
      {devices.length > 0 && (
        <div>
          {/* <pre>{JSON.stringify(devices, null, 2)}</pre> */}
          {devices && (
            <>
              <LoRaDeviceTable
                devices={devices}
                showLastSeen={false}
                showDeviceProfile={false}
                showJoinJeys={true}
                allowClick={false}
              />
              <br />

              <Dropdown
                options={deviceProfiles}
                topLabel="Select device profile for upload:"
                value={selectedDeviceProfile}
                onChange={(value) => setSelectedDeviceProfile(value)}
              />

              {selectedDeviceProfile && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ marginTop: 3 }}
                >
                  Submit
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
