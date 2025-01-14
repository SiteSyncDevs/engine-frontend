import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import DeviceStatus from "../components/DeviceStatus";
import ConnectionStatus from "../components/connections/ConnectionsStatus";
import LoRaGatewayStatus from "../components/LoRaGatewayStatus";

const connections = [
  {
    id: 1,
    name: "PLC Logix",
    description:
      "Puts valve position data into the distallation tower's PLC register.",
    protocol: "TCP",
    address: "192.168.1.1",
    connected: true,
    lastStatusCheck: "2024-11-01 17:32:21",
  },
  {
    id: 2,
    name: "Aloxy.Core",
    description: "Aloxy Webhook Integration.",
    protocol: "HTTPS",
    address: "192.168.1.2",
    connected: false,
    lastStatusCheck: "2024-10-31 12:21:36",
  },
  {
    id: 3,
    name: "MQTT",
    description: "Connection to external Chariot broker.",
    protocol: "MQTT",
    address: "192.168.1.3",
    connected: true,
    lastStatusCheck: "2024-11-22 01:05:21",
  },
  // Add more connections as needed
];

export default function Dashboard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <div className="flex justify-center h-full p-4 md:p-8 overflow-auto">
      <Box className="w-full md:w-3/4">
        <Stack spacing={2}>
          <DeviceStatus />
          <ConnectionStatus connections={connections} />
          <LoRaGatewayStatus />
        </Stack>
      </Box>
    </div>
  );
}
