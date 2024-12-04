import { Button, Tooltip } from "@mui/material";

export default function CustomButton({
  handleSubmit,
  label,
  color = "primary",
  hoverText = "",
}) {
  return (
    <Tooltip title={hoverText} arrow>
      <Button
        variant="contained"
        color={color}
        onClick={handleSubmit}
        sx={{
          padding: "3px 12px", // Adjust padding to reduce height
        }}
      >
        <p>{label}</p>
      </Button>
    </Tooltip>
  );
}
