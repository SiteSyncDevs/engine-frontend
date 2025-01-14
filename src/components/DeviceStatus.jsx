import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, status) {
  return { name, status };
}

const rows = [
  createData("LoRaWAN Network Server", "Operational"),
  createData("LoRaWAN Gateway", "Operational"),
  createData("MQTT Broker", "Operational"),
];

export default function DeviceStatus() {
  return (
    <div className="border-red-500">
      <h1 className="font-bold text-lg md:text-xl">System Status</h1>
      <TableContainer component={Paper} className="overflow-x-auto">
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="text-sm md:text-base">
                  {row.name}
                </TableCell>
                <TableCell className="text-sm md:text-base">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}