import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Label } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FileUpload({ onFileUpload, label, hoverText, showFileName=true }) {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContents = e.target.result;
        if (onFileUpload) {
          onFileUpload(file.name, fileContents); // Pass file name and contents to parent
        }
      };
      reader.readAsText(file); // Reads file content as text
    }
  };

  return (
    <Tooltip title={hoverText} arrow>
      <Box display="flex" alignItems="center">
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "3px 12px", // Adjust padding to reduce height
          }}
        >
          {label}
          <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
        </Button>
        {showFileName && fileName && (
          <Typography variant="body1" marginLeft={2}>
            {fileName}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
}
