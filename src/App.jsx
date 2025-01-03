import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Header from "./components/Header";
import AppRoutes from "./Routes";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {/* Header */}
        <Header onClick={() => setCollapsed(!collapsed)} />

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Overlay for mobile */}
          {isMobile && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-40"
              onClick={closeSidebar}
            />
          )}

          {/* Sidebar */}
          <div className={`
            transition-transform duration-300 ease-in-out
            ${isMobile ? 'fixed h-full' : 'relative'} 
            ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
            z-50
          `}>
            <Sidebar
              collapsed={collapsed}
              collapsedWidth="70px"
              width="250px"
              className="h-[calc(100vh-64px)] shadow-lg"
              toggled={sidebarOpen}
              onBackdropClick={closeSidebar}
              breakPoint="sm"
            >
              <Menu>
                <MenuItem 
                  onClick={closeSidebar} 
                  component={<Link to="/" />}
                >
                  Home
                </MenuItem>
                <SubMenu label="Devices">
                  <MenuItem 
                    onClick={closeSidebar} 
                    component={<Link to="/device/manage" />}
                  >
                    Manage
                  </MenuItem>
                  <MenuItem 
                    onClick={closeSidebar} 
                    component={<Link to="/device/create" />}
                  >
                    Create
                  </MenuItem>
                </SubMenu>
                <MenuItem 
                  onClick={closeSidebar} 
                  component={<Link to="/connections" />}
                >
                  Connections
                </MenuItem>
              </Menu>
            </Sidebar>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-5 overflow-auto">
            <AppRoutes />
          </div>
        </div>

        {/* Sidebar toggle button for mobile */}
        {isMobile && (
          <IconButton
            onClick={toggleSidebar}
            className="fixed bottom-4 left-4 z-50 bg-white shadow-lg hover:bg-gray-100"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
            }}
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </div>
    </Router>
  );
}

export default App;