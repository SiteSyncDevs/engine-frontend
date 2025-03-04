import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function LoRaDeviceTable({
  devices,
  showLastSeen = true,
  showJoinJeys = false,
  showDeviceProfile = true,
  allowClick = true,
}) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleRowClick = (devEUI) => {
    navigate(`/device/manage/${devEUI}`);
  };

  return (
    <div>
      {isMobile ? (
        <div style={{ overflowY: "auto", maxHeight: 600 }}>
          {devices.map((device) => (
            <Card
              key={device.id}
              sx={{ marginBottom: 2, cursor: "pointer" }}
              onClick={() => handleRowClick(device.dev_eui)}
            >
              <CardContent>
                <Typography variant="h6">{device.name}</Typography>
                <Typography variant="body2">Dev EUI: {device.dev_eui}</Typography>
                {showJoinJeys && (
                  <>
                    <Typography variant="body2">Join EUI: {device.join_eui}</Typography>
                    <Typography variant="body2">App Key: {device.app_key}</Typography>
                  </>
                )}
                {showDeviceProfile && (
                  <Typography variant="body2">Device Type: {device.device_type}</Typography>
                )}
                {showLastSeen && (
                  <Typography variant="body2">Last Seen: {device.last_seen}</Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
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
                    cursor: "pointer", // Add pointer cursor to indicate clickable rows
                  }}
                  onClick={() => handleRowClick(device.dev_eui)} // Navigate on row click
                >
                  <TableCell component="th" scope="row">
                    {device.name}
                  </TableCell>
                  <TableCell>{device.dev_eui}</TableCell>
                  {showJoinJeys && <TableCell>{device.join_eui}</TableCell>}
                  {showJoinJeys && <TableCell>{device.app_key}</TableCell>}
                  {showDeviceProfile && <TableCell>{device.device_type}</TableCell>}
                  {showLastSeen && <TableCell>{device.last_seen}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}