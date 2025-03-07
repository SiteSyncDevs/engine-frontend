import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DeviceManagement from "./pages/Devices";
import CreateDevice from "./pages/CreateDevice";
import Connections from "./pages/Connections";
import ConnectionCreatorRoot from "./components/connections/create/ConnectionCreatorRoot";
import DeviceDetail from "./pages/DeviceDetail";
import ConnectionTester from "./components/connections/test/ConnectionTester";
const routes = [
  { path: "/", element: <Dashboard />, name: "Dashboard" },
  {
    path: "/device/manage",
    element: <DeviceManagement />,
  },
  { path: "/device/create", element: <CreateDevice /> },
  { path: "/connections", element: <Connections /> },
  {
    path: "/connections/add/mqtt",
    element: <ConnectionCreatorRoot connectionType={"MQTT"} />,
  },
  {
    path: "/connections/add/opc-ua",
    element: <ConnectionCreatorRoot connectionType={"OPC-UA"} />,
  },
  {
    path: "/connections/add/sparkplug-b",
    element: <ConnectionCreatorRoot connectionType={"Sparkplug-B"} />,
  },
  {
    path: "/connections/add/modbus",
    element: <ConnectionCreatorRoot connectionType={"Modbus"} />,
  },
  {
    path: "/connections/add/plc",
    element: <ConnectionCreatorRoot connectionType={"PLC"} />,
  },
  {
    path: "/device/manage/:deviceId",
    element: <DeviceDetail  />,
  },
  {
    path: "/connections/test",
    element: <ConnectionTester />,
  }
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
