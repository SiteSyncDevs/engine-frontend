import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Alert({ children, variant = "info" }) {
  const baseClasses = "p-4 rounded-md flex items-start space-x-3";
  const variantClasses = {
    info: "bg-blue-50 text-blue-800",
    warning: "bg-yellow-50 text-yellow-800",
    error: "bg-red-50 text-red-800",
    success: "bg-green-50 text-green-800",
  };

  const iconComponents = {
    info: <InfoOutlinedIcon fontSize="small" />,
    warning: <WarningAmberOutlinedIcon fontSize="small" />,
    error: <ErrorOutlineIcon fontSize="small" />,
    success: <CheckCircleOutlineIcon fontSize="small" className="h-5 w-5" />,
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} w-full md:w-auto`}>
      {iconComponents[variant]}
      <div className="flex-1">{children}</div>
    </div>
  );
}