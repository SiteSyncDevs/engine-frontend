import { useState } from "react";
import { QrCodeScanner } from "react-simple-qr-code-scanner";

export default function QrScanner({ handleScan }) {
  const [isScanning, setIsScanning] = useState(true);

  const handleResult = (result) => {
    if (result) {
      setIsScanning(false);  
      handleScan(result);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button onClick={handleBack} className="absolute top-4 left-4 text-gray-700">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      {isScanning ? (
        <>
          <p className="mb-4 text-lg font-semibold">Scan your QR code here</p>
          <div className="w-80 h-80 sm:w-64 sm:h-64 flex items-center justify-center bg-white rounded-lg shadow-lg">
            <QrCodeScanner onResult={handleResult} />
          </div>
        </>
      ) : (
        <p>Scanner closed after detecting QR code.</p>
      )}
    </div>
  );
}