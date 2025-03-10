import { useNavigate } from "react-router-dom";

const connectionTypes = [
  {
    id: 3,
    name: "MQTT",
    desc: "The MQTT connection forwards events to an MQTT broker",
    route: "/connections/add/mqtt",
  },
  {
    id: 5,
    name: "OPC-UA",
    desc: "The OPC-UA connection forwards events to an OPC-UA server",
    route: "/connections/add/opc-ua",
  },
  {
    id: 6,
    name: "Modbus",
    desc: "The Modbus connection forwards events to a Modbus server",
    route: "/connections/add/modbus",
  },
  {
    id: 7,
    name: "Logix PLC",
    desc: "The Logix PLC connection forwards events to a Logix PLC",
    route: "/connections/add/plc",
  },
  {
    id: 8,
    name: "Sparkplug-B",
    desc: "The Sparkplug-B connection forwards events to a Sparkplug-B",
    route: "/connections/add/sparkplug-b",
  },
];

function ConnectionOptionCard({ connectionType }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(connectionType.route);
  };
  return (
    <div
      className="border-2 border-gray-200 p-4 rounded-md cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      <h3 className="font-bold text-lg">{connectionType.name}</h3>
      <p>{connectionType.desc}</p>
    </div>
  );
}

export default function ConnectionCreationViewer() {
  return (
    <div className="h-[calc(100vh-16rem)] w-full">
      <div className="h-full overflow-y-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
          {connectionTypes.map((connectionType) => (
            <ConnectionOptionCard
              key={connectionType.id}
              connectionType={connectionType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}