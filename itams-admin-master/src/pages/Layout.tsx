import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import "../components/sidebar/Sidebar.css";
import { useLocation } from "react-router-dom";

function Layout() {
  const { pathname } = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );
  return (
    <Box sx={{ maxHeight: "100vh" }}>
      <Header onNavOpen={() => setOpenNav(true)} />
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
          <Sidebar onClose={() => setOpenNav(false)} open={openNav} />
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
