import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import api from "../api/axiousInstance";

export default function Bookings() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookingsCount = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/bookings");
      setTotal(res.data.totalBookings);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings count.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingsCount();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" mb={3}>
          Bookings Overview
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Total Bookings
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, mt: 1 }}>
              {total}
            </Typography>

            <Typography sx={{ mt: 2 }} color="text.secondary">
              Bookings are managed by the user application.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
