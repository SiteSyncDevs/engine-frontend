import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";

export default function ConnectionStatusCard({
  connectionName,
  connectionDescription,
  connectionProtocol,
  address,
  connected,
  lastUpdated,
}) {
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 360, borderRadius: 2, height: 175 }}
    >
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {connectionName}
          </Typography>
          <Tooltip title={`Last updated: ${lastUpdated}`} arrow>
            <CircleIcon
              sx={{
                color: connected ? "green" : "red",
                height: 15,
                marginBottom: 1,
              }}
            />
          </Tooltip>
        </Stack>

        <Box
          sx={{
            minHeight: 48, // Adjust as needed to ensure consistent space
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {connectionDescription}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          <Chip label={connectionProtocol} size="small" />
          <Chip label={address} size="small" />
        </Stack>
      </Box>
    </Card>
  );
}
