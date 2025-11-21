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
  IconButton,
} from "@mui/material";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import { listUsers, listBookings } from "../api/mockApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge"; // For Role
import EventNoteIcon from "@mui/icons-material/EventNote"; // For Bookings
import SettingsIcon from "@mui/icons-material/Settings"; // For Actions

export default function Users() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  async function load() {
    const [u, b] = await Promise.all([listUsers(), listBookings()]);
    setUsers(u);
    setBookings(b);
  }

  useEffect(() => {
    load();
  }, []);

  const countBookings = (userId) =>
    bookings.filter((b) => b.userId === userId).length;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: 8,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffffff 0%, #f3f6fa 100%)",
      }}
    >
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Users
        </Typography>

        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EmailIcon sx={{ mr: 1, fontSize: 18 }} /> Email
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PhoneIcon sx={{ mr: 1, fontSize: 18 }} /> Phone
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <BadgeIcon sx={{ mr: 1, fontSize: 18 }} /> Role
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EventNoteIcon sx={{ mr: 1, fontSize: 18 }} /> Bookings
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SettingsIcon sx={{ mr: 1, fontSize: 18 }} /> Actions
                  </Box>
                </TableCell>
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
                    <IconButton size="small">
                      {/* <VisibilityIcon /> */}
                    </IconButton>
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
