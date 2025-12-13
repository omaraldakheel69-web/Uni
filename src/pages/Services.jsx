import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Button
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import EditServiceDialog from "../SerDia/EditServiceDialog";
import ConfirmDialog from "../Components/ConfirmDialog";
import api from "../api/axiousInstance";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [error, setError] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async (payload) => {
    try {
      // Convert pricePerHour to number
      const formattedPayload = { ...payload, pricePerHour: Number(payload.pricePerHour) };

      if (edit.initial?.id) {
        await api.put(`/services/${edit.initial.id}`, formattedPayload);
      } else {
        await api.post("/services", formattedPayload);
      }
      setEdit({ open: false, initial: null });
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Failed to save service.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Failed to delete service.");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h4">Services</Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => setEdit({ open: true, initial: null })}
          >
            New Service
          </Button>
        </Box>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Paper sx={{ p: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price/Hour</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.description}</TableCell>
                    <TableCell>{s.pricePerHour ? `$${s.pricePerHour}` : "-"}</TableCell>
                    <TableCell>{s.category}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => setEdit({ open: true, initial: s })}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => setConfirm({ open: true, id: s.id })}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {services.length === 0 && <Typography sx={{ p: 2 }}>No services yet.</Typography>}

            <EditServiceDialog
              open={edit.open}
              initial={edit.initial}
              onClose={() => setEdit({ open: false, initial: null })}
              onSave={handleSave}
            />
            <ConfirmDialog
              open={confirm.open}
              title="Delete Service"
              description="Are you sure you want to delete this service?"
              onClose={(v) => setConfirm((s) => ({ ...s, open: v }))}
              onConfirm={() => handleDelete(confirm.id)}
            />
          </Paper>
        )}
      </Box>
    </Box>
  );
}
