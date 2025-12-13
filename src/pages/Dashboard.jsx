import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People"; 
import BusinessIcon from "@mui/icons-material/Business"; 
import EventNoteIcon from "@mui/icons-material/EventNote"; 
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import api from "../api/axiousInstance"; // <-- use your Axios instance

export default function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCompanies: 0, servicesBooked: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/dashboard"); // automatically sends token
      setStats(res.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, minHeight: "100vh", background: "linear-gradient(135deg, #ffffff 0%, #f3f6fa 100%)" }}>
        <Typography variant="h4" mb={4}>Dashboard Overview</Typography>
        {loading ? (
          <Typography>Loading dashboard data...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', textAlign: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}>
                <PeopleIcon sx={{ color: '#4CAF50', fontSize: 40 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>Total Users</Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, mt: 0.5 }}>{stats.totalUsers}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', textAlign: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}>
                <BusinessIcon sx={{ color: '#11694C', fontSize: 40 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>Companies</Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, mt: 0.5 }}>{stats.totalCompanies}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', textAlign: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}>
                <EventNoteIcon sx={{ color: '#11694C', fontSize: 40 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>Services Booked</Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, mt: 0.5 }}>{stats.servicesBooked}</Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
