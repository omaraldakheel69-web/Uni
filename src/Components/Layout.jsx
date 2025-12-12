// Components/Layout.jsx
import React from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbard";

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Topbar />
        <Toolbar /> {/* Push content below fixed Topbar */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
