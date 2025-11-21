import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import {
  listBookings,
  listCompanies,
  listServices,
  listUsers,
  updateBooking,
} from "../api/mockApi";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  async function load() {
    const [b, c, s, u] = await Promise.all([
      listBookings(),
      listCompanies(),
      listServices(),
      listUsers(),
    ]);
    setBookings(b);
    setCompanies(c);
    setServices(s);
    setUsers(u);
  }

  useEffect(() => {
    load();
  }, []);

  const find = (arr, id, field = "name") =>
    (arr.find((x) => x.id === id) || {})[field] || "-";

  const changeStatus = async (id, status) => {
    await updateBooking(id, { status });
    load();
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          minHeight: "100vh",
          background: "linear-gradient(135deg, #ffffffff 0%, #f3f6fa 100%)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Bookings
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            background: "#fff",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
            "&:nth-of-type(odd)": { backgroundColor: "#f3f4f4" },
            "&:hover": { backgroundColor: "#EEFFFF" },
        }}
              >
                <TableCell>Booking ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Scheduled</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
           <TableBody>
    {bookings.map((b) => (
        <TableRow 
            // 1. Update the key to use the snake_case ID (or fallback)
            key={b.booking_id || b.id} 
            sx={{
                "&:nth-of-type(odd)": { backgroundColor: "#F9F9F9" },
                "&:hover": { backgroundColor: "#E8F5E9" },
            }}
        >
            {/* Tweak Booking ID */}
            <TableCell>{b.booking_id || b.id}</TableCell> 
            {/* Tweak User ID: b.userId -> b.user_id */}
            <TableCell>{find(users, b.user_id || b.userId, "name")}</TableCell>
            {/* Tweak Company ID: b.companyId -> b.company_id */}
            <TableCell>{find(companies, b.company_id || b.companyId, "name")}</TableCell>
            {/* Tweak Service ID: b.serviceId -> b.service_id */}
            <TableCell>{find(services, b.service_id || b.serviceId, "name")}</TableCell>
            
            <TableCell>
                {/* 2. Tweak Scheduled At field (assuming b.scheduledAt -> b.scheduled_at) */}
                {new Date(b.scheduled_at || b.scheduledAt).toLocaleString()}
            </TableCell>
            
            <TableCell>${b.price}</TableCell>
            <TableCell>
                <FormControl size="small">
                    <Select
                        size="small"
                        sx={{
                            bgcolor: "#E6F7EA", // Updated light green background
                            borderRadius: "8px",
                            "& .MuiSelect-select": { py: 1 },
                        }}
                        value={b.status}
                        // 3. Update changeStatus to use snake_case ID
                        onChange={(e) => changeStatus(b.booking_id || b.id, e.target.value)} 
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="confirmed">Confirmed</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
            {/* Tweak for Actions Column (if applicable) */}
        </TableRow>
    ))}
</TableBody>
          </Table>

          {bookings.length === 0 && (
            <Typography sx={{ p: 2 }}>No bookings yet.</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
