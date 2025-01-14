import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function LoRaDeviceTable({
  devices,
  showLastSeen = true,
  showJoinJeys = false,
  showDeviceProfile = true,
  allowClick = true,
}) {
  const navigate = useNavigate();

  const handleRowClick = (devEUI) => {
    navigate(`/device/manage/${devEUI}`);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 600, // Limit height of the container for scrolling
        overflow: "auto",
      }}
    >
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        aria-label="LoRa Devices Table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Device Name</TableCell>
            <TableCell>Dev EUI</TableCell>
            {showJoinJeys && <TableCell>Join EUI</TableCell>}
            {showJoinJeys && <TableCell>App Key</TableCell>}
            {showDeviceProfile && <TableCell>Device Type</TableCell>}
            {showLastSeen && <TableCell>Last Seen</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow
            key={device.id}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              cursor: allowClick ? "pointer" : "default", // Add pointer cursor if clickable
            }}
            onClick={allowClick ? () => handleRowClick(device.dev_eui) : undefined} // Conditionally add onClick
            >
              <TableCell component="th" scope="row">
                {device.name}
              </TableCell>
              <TableCell>{device.dev_eui}</TableCell>
              {showJoinJeys && <TableCell>{device.app_eui}</TableCell>}
              {showJoinJeys && <TableCell>{device.app_key}</TableCell>}
              {showDeviceProfile && <TableCell>{device.deviceType}</TableCell>}
              {showLastSeen && (
                <TableCell>
                  {device.last_seen ? device.last_seen : "Never"}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
