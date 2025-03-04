import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import { useMediaQuery } from "@mui/material";

export default function ConnectionStatusCard({
  connectionName,
  connectionDescription,
  connectionProtocol,
  address,
  connected,
  lastUpdated,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Card
      variant="outlined"
      className={`border-radius-2 ${isMobile ? "w-full" : "max-w-xs"} h-44`}
    >
      <Box className="p-2">
        <Stack
          direction="row"
          className="justify-between items-center"
        >
          <Typography gutterBottom variant="h5" component="div">
            {connectionName}
          </Typography>
          <Tooltip title={`Last updated: ${lastUpdated}`} arrow>
            <CircleIcon
              sx={{
                color: connected ? "green" : "red"
              }}
              className={`h-4 mb-1`}
            />
          </Tooltip>
        </Stack>

        <Box
          className="min-h-12 flex items-center"
        >
          <Typography variant="body2" className="text-gray-500">
            {connectionDescription}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box className="p-2">
        <Stack direction="row" spacing={1}>
          <Chip label={connectionProtocol} size="small" />
          <Chip label={address} size="small" />
        </Stack>
      </Box>
    </Card>
  );
}