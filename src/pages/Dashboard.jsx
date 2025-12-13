import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import EventIcon from "@mui/icons-material/Event";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import api from "../api/axiousInstance";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    companies: 0,
    services: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const Card = ({ icon, label, value }) => (
    <Paper
      sx={{
        p: 3,
        width: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      {icon}
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
      <Typography color="text.secondary">{label}</Typography>
    </Paper>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
        <Typography variant="h4" mb={4}>
          Dashboard Overview
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Card
            icon={<PeopleIcon fontSize="large" color="success" />}
            label="Total Users"
            value={stats.users}
          />
          <Card
            icon={<BusinessIcon fontSize="large" color="success" />}
            label="Companies"
            value={stats.companies}
          />
          <Card
            icon={<EventIcon fontSize="large" color="success" />}
            label="Services Booked"
            value={stats.services}
          />
        </Box>
      </Box>
    </Box>
  );
}
