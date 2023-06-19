import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import "../components/sidebar/Sidebar.css";

function Layout() {
  return (
    <Box sx={{ maxHeight: "100vh" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          background: "#EEE",
        }}
      >
        <Box
          className="sidebar-content"
          sx={{
            backgroundColor: "#ffffff",
            height: "calc(100vh - 68.5px)",
            maxHeight: "calc(100vh - 68.5px)",
            overflowY: "auto",
            flex: "0 0 auto",
          }}
        >
          <Sidebar />
        </Box>
        <Box
          sx={{
            maxHeight: "calc(100vh - 68.5px)",
            boxSizing: "border-box",
            overflowY: "auto",
            flex: "1 1 auto",
            padding: { md: "8px 16px", xs: "8px" },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
