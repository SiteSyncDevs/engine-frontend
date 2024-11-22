import BulkUploader from "../components/BulkUploader";
import React, { useState } from "react";
import { Modal, Button, useMediaQuery } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function CreateDevice() {
  const [open, setOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanData, setScanData] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen size

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
      setScanData(result[0].rawValue);
      handleClose(); // Close both the scanner and the modal
    }
  };

  return (
    <div>
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
    </div>
  );
}
