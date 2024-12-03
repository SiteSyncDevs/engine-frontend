const connectionTypes = [
  {
    id: 3,
    name: "MQTT",
    desc: "The MQTT connection forwards events to an MQTT broker",
  },
  {
    id: 5,
    name: "OPC-UA",
    desc: "The OPC-UA connection forwards events to an OPC-UA server",
  },
  {
    id: 6,
    name: "Modbus",
    desc: "The Modbus connection forwards events to a Modbus server",
  },
  {
    id: 7,
    name: "Logix PLC",
    desc: "The Logix PLC connection forwards events to a Logix PLC",
  },
  {
    id: 8,
    name: "Sparkplug-B",
    desc: "The Sparkplug-B connection forwards events to a Sparkplug-B",
  },
];

function ConnectionOptionCard({ connectionType }) {
  return (
    <div className="border-2 border-gray-200 p-4 rounded-md">
      <h3 className="font-bold text-lg">{connectionType.name}</h3>
      <p>{connectionType.desc}</p>
    </div>
  );
}
export default function ConnectionCreationViewer() {
  return (
    // {connectionTypes.map((connectionType) => ( <ConnectionOptionCard key={connectionType.id} connectionType={connectionType} /> ))}
    <div className="grid grid-cols-4 gap-4">
      {/* <h1>Connection Creation</h1> */}
      {connectionTypes.map((connectionType) => (
        <ConnectionOptionCard
          key={connectionType.id}
          connectionType={connectionType}
        />
      ))}
    </div>
  );
}
