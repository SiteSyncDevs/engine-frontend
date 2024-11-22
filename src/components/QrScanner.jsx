import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QrScanner() {
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = (result) => {
    if (result) {
      console.log("QR Code Result:", result);
      setIsScanning(false); // Stop the scanner
    }
  };

  return (
    <div>
      {isScanning ? (
        <Scanner
          onScan={handleScan}
          onError={(error) => console.error("QR Scanner Error:", error)}
        />
      ) : (
        <p>Scanner closed after detecting QR code.</p>
      )}
    </div>
  );
}
