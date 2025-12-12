import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Layout from "../Components/Layout";
import { listUsers, listCompanies, listBookings } from "../api/mockApi";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [usersData, companiesData, bookingsData] = await Promise.all([
        listUsers(),
        listCompanies(),
        listBookings()
      ]);
      setUsers(usersData);
      setCompanies(companiesData);
      setBookings(bookingsData);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <Typography variant="h4" mb={4}>Dashboard Overview</Typography>

      {loading ? (
        <Typography>Loading dashboard data...</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p:3, borderRadius:2, textAlign:"center" }}>
              <PeopleIcon sx={{ fontSize:40, color:"#4CAF50" }} />
              <Typography variant="h6" color="text.secondary">Total Users</Typography>
              <Typography variant="h2">{users.length}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p:3, borderRadius:2, textAlign:"center" }}>
              <BusinessIcon sx={{ fontSize:40, color:"#11694C" }} />
              <Typography variant="h6" color="text.secondary">Companies</Typography>
              <Typography variant="h2">{companies.length}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p:3, borderRadius:2, textAlign:"center" }}>
              <EventNoteIcon sx={{ fontSize:40, color:"#11694C" }} />
              <Typography variant="h6" color="text.secondary">Services Booked</Typography>
              <Typography variant="h2">{bookings.length}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
