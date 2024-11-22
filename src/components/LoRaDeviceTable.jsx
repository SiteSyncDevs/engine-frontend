import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { DataGrid } from '@mui/x-data-grid';




export default function LoRaDeviceTable({ devices, showLastSeen = true }) {
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
            <TableCell>App EUI</TableCell>
            <TableCell>App Key</TableCell>
            {showLastSeen && <TableCell> Last Seen</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow
              key={device.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {device.name}
              </TableCell>
              <TableCell>{device.dev_eui}</TableCell>
              <TableCell>{device.app_eui}</TableCell>
              <TableCell>{device.app_key}</TableCell>
              {showLastSeen && <TableCell>{device.last_seen}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
