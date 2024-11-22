import { useState } from "react";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DeviceManagement from "./pages/Devices";
import CreateDevice from "./pages/CreateDevice";
import Connections from "./pages/Connections";
import Header from "./components/Header";
function App() {
  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}
      >
        {/* Header */}
        <Header />

        {/* Main Layout */}
        <div style={{ display: "flex", flex: 1 }}>
          {/* Sidebar */}
          <Sidebar collapsed={true} collapsedWidth="70px">
            <Menu>
              <MenuItem component={<Link to="/" />}>Home</MenuItem>
              <SubMenu label="Devices">
                <MenuItem component={<Link to="/device/manage" />}>
                  Manage
                </MenuItem>
                <MenuItem component={<Link to="/device/create" />}>
                  Create
                </MenuItem>
              </SubMenu>

              <MenuItem component={<Link to="/connections" />}>
                Connections
              </MenuItem>
            </Menu>
          </Sidebar>

          {/* Main Content */}
          <div style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/device/manage" element={<DeviceManagement />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/device/create" element={<CreateDevice />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
