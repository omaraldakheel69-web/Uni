import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, MenuItem, Select, FormControl } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import { listBookings, listCompanies, listServices, listUsers, updateBooking } from "../api/mockApi";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  async function load() {
    const [b, c, s, u] = await Promise.all([listBookings(), listCompanies(), listServices(), listUsers()]);
    setBookings(b);
    setCompanies(c);
    setServices(s);
    setUsers(u);
  }

  useEffect(() => { load(); }, []);

  const find = (arr, id, field = "name") => (arr.find((x) => x.id === id) || {})[field] || "-";

  const changeStatus = async (id, status) => {
    await updateBooking(id, { status });
    load();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Bookings</Typography>
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
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
                <TableRow key={b.id}>
                  <TableCell>{b.id}</TableCell>
                  <TableCell>{find(users, b.userId, "name")}</TableCell>
                  <TableCell>{find(companies, b.companyId, "name")}</TableCell>
                  <TableCell>{find(services, b.serviceId, "name")}</TableCell>
                  <TableCell>{new Date(b.scheduledAt).toLocaleString()}</TableCell>
                  <TableCell>${b.price}</TableCell>
                  <TableCell>
                    <FormControl size="small">
                      <Select value={b.status} onChange={(e) => changeStatus(b.id, e.target.value)}>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="confirmed">Confirmed</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {bookings.length === 0 && <Typography sx={{ p: 2 }}>No bookings yet.</Typography>}
        </Paper>
      </Box>
    </Box>
  );
}
