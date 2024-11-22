import ConnectionsStatus from "../components/ConnectionsStatus";
import CreateConnectionModal from "../components/CreateConnectionModal";

export default function Connections() {
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
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
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
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
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
    {
      id: 3,
      name: "MQTT",
      description: "Connection to external Chariot broker.",
      protocol: "MQTT",
      address: "192.168.1.3",
      connected: true,
      lastStatusCheck: "2024-11-22 01:05:21",
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
  return (
    <div>
      <h1>Connections</h1>
      <CreateConnectionModal />

      <ConnectionsStatus connections={connections} />
    </div>
  );
}
