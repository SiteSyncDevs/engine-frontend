import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("LoRaWAN Network Server", "Operational", 6.0, 24, 4.0),
  createData("LoRaWAN Gateway", "Operational", 9.0, 37, 4.3),
  createData("MQTT Broker", "Operational", 16.0, 24, 6.0),

];

export default function DeviceStatus() {
  return (
    <div className=" border-red-500">
      <h1 className="font-bold">System Status</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
        
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
