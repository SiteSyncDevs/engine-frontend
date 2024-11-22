import UploadFileIcon from "@mui/icons-material/UploadFile";
import { ChangeEvent, useState } from "react";
import { Button, Box, Paper } from "@mui/material";
import LoRaDeviceTable from "./LoRaDeviceTable";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["CSV"];

export default function BulkUploader() {
  const [devices, setDevices] = useState([]);
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileUpload(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  //   const handleFileUpload = (uploadedFile) => {
  //     setFile(uploadedFile);
  //     console.log("Uploaded File:", uploadedFile);
  //   };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileUpload(event.target.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (e) => {
    console.log("file");
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      const records = parseCSV(result);
      setDevices(records);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvString) => {
    const lines = csvString.split("\n").map((line) => line.trim());
    const header = lines
      .shift()
      ?.split(",")
      .map((h) => h.trim());
    if (
      !header ||
      !header.includes("dev_eui") ||
      !header.includes("join_eui") ||
      !header.includes("app_key") ||
      !header.includes("local_name")
    ) {
      console.error(
        "Invalid CSV headers. Expected: dev_eui, join_eui, app_key, local_name"
      );
      return [];
    }

    return lines
      .filter((line) => line) // Skip empty lines
      .map((line) => {
        const values = line.split(",").map((value) => value.trim());
        const record = {};
        header.forEach((key, index) => {
          record[key] = values[index];
        });

        return {
          name: record["local_name"] || "Unknown Device",
          dev_eui: record["dev_eui"],
          app_eui: record["join_eui"],
          app_key: record["app_key"],
        };
      });
  };

  return (
    <div>
      <Button
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
        sx={{ marginRight: "1rem" }}
      >
        Upload CSV
        <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
      </Button>

      

        {devices.length > 0 && (
          <div>
            <h2>Uploaded Devices:</h2>
            {/* <pre>{JSON.stringify(devices, null, 2)}</pre> */}
            <LoRaDeviceTable devices={devices} showLastSeen={false} />
          </div>
        )}
      </div>
  );
}
