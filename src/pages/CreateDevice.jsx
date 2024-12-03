import BulkUploader from "../components/BulkUploader";
import React, { useState } from "react";
import { Modal, Button, useMediaQuery } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";
import ApiHandler from "../api/ApiHandler";
export default function CreateDevice() {
  const [open, setOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanData, setScanData] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen size

  const [appKey, setAppKey] = useState("");
  const [devEUI, setDevEUI] = useState("");

  const [appEui, setAppEui] = useState("");
  const [deviceProfile, setDeviceProfile] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setIsScanning(true); // Start scanning when modal opens
  };

  const handleClose = () => {
    setOpen(false);
    setIsScanning(false); // Stop scanning when modal closes
  };

  const handleScan = (result) => {
    if (result) {
      console.log("QR Code Result:", result[0].rawValue);
      const scanLocal = result[0].rawValue;
      setScanData(result[0].rawValue);

      const parts = scanLocal.split(":");

      // @TODO: Validate the QR code data
      if (parts.length !== 4) {
        console.error("Invalid QR code data");
        return;
      }
      const app_key = parts[0];
      const dev_eui = parts[1];
      const deviceProfile = parts[2];
      const join_eui = parts[3];
      const apiData = {
        "device_name": "Test Device",
        "dev_eui": dev_eui,
        "join_eui": join_eui,
        "app_key": app_key,
        "device_profile_id": deviceProfile
      }
      ApiHandler.post("/routers/v1/device",  apiData ).then((data) => {
        console.log("Data:", data);
      });
      // Assign the three parts to variables
      

      setAppKey(app_key);
      setDevEUI(dev_eui);

      setAppEui(join_eui);
      setDeviceProfile(deviceProfile);

      handleClose(); // Close both the scanner and the modal
    }
  };

  return (
    <div>
      <BulkUploader />
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
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
              <Scanner
                onScan={handleScan}
                onError={(error) => console.error("QR Scanner Error:", error)}
              />
            )}
          </div>
        </div>
      </Modal>
      <h1>QR Code Data: {scanData}</h1> 
       <h2>App Key: {appKey}</h2>
      <h2>Dev EUI: {devEUI}</h2>
      <h2>App EUI: {appEui}</h2>
      <h2>Device Profile: {deviceProfile}</h2>
    </div>
  );
}
