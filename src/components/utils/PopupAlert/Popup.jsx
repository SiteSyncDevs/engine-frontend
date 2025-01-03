import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useEffect, useState } from "react";

/**
 * ALERT TYPES:
 * -- info
 * -- success
 * -- warning
 * -- error
 */

export default function PopupAlert({
  message,
  type = "info",
  duration = 5000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  // background color for popups (can change)
  const bgColor = {
    info: "bg-blue-100 border-blue-500 text-blue-800",
    success: "bg-green-100 border-green-500 text-green-800",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
    error: "bg-red-100 border-red-500 text-red-800",
  }[type];

  const iconComponents = {
    info: <InfoOutlinedIcon fontSize="small" />,
    success: <CheckCircleOutlineIcon fontSize="small" />,
    warning: <WarningAmberOutlinedIcon fontSize="small" />,
    error: <ErrorOutlineIcon fontSize="small" />,
  };

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ${bgColor} z-50`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{iconComponents[type]}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}