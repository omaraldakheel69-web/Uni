import { Box, Typography, Paper, Grid } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" mb={3}>
          Dashboard Overview
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>Total Users: 120</Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>Companies: 25</Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>Services Booked: 340</Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
