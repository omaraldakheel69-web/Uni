import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import { listUsers, listBookings } from "../api/mockApi";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  async function load() {
    const [u, b] = await Promise.all([listUsers(), listBookings()]);
    setUsers(u);
    setBookings(b);
  }

  useEffect(() => { load(); }, []);

  const countBookings = (userId) => bookings.filter((b) => b.userId === userId).length;

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Users</Typography>

        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Bookings</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.phone}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{countBookings(u.id)}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}
