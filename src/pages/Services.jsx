import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import EditServiceDialog from "../SerDia/EditServiceDialog";
import ConfirmDialog from "../Components/ConfirmDialog";

import * as api from "../api/mockApi";

const drawerWidth = 240;

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.listServices();
      setServices(data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Failed to load services. Please check the mock API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = () => {
    setEdit({ open: true, initial: null });
  };

  const handleEdit = (service) => {
    setEdit({ open: true, initial: service });
  };

  const handleSave = async (payload) => {
    try {
      const servicePayload = {
        name: payload.name,
        description: payload.description,
        category: payload.category,
        pricePerHour: Number(payload.pricePerHour),
        image: payload.imageFile || null,
      };

      if (edit.initial?.id) {
        await api.updateService(edit.initial.id, servicePayload);
      } else {
        await api.createService(servicePayload);
      }

      setEdit({ open: false, initial: null });
      load();
    } catch (err) {
      console.error("Failed to save service:", err);
      setError("Failed to save service. Check server console.");
    }
  };

  const handleDelete = async () => {
    if (!confirm.id) return;
    try {
      await api.deleteService(confirm.id);
      setConfirm({ open: false, id: null });
      load();
    } catch (err) {
      console.error("Failed to delete service:", err);
      setError("Failed to delete service. Check server console.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          mt: 8, // pushes content below Topbar
        }}
      >
        <Topbar />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Services</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{ backgroundColor: "#11694C", "&:hover": { backgroundColor: "#0c5c3b" } }}
          >
            NEW SERVICE
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>$ Price/hr</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <CircularProgress size={24} />
                    </TableCell>
                  </TableRow>
                ) : services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No services found</TableCell>
                  </TableRow>
                ) : (
                  services.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.name || ""}</TableCell>
                      <TableCell>{s.description || ""}</TableCell>
                      <TableCell>${s.pricePerHour || 0}</TableCell>
                      <TableCell>{s.category || ""}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleEdit(s)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => setConfirm({ open: true, id: s.id })}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <EditServiceDialog
          open={edit.open}
          initial={edit.initial}
          onClose={() => setEdit({ open: false, initial: null })}
          onSave={handleSave}
        />

        <ConfirmDialog
          open={confirm.open}
          onClose={() => setConfirm({ open: false, id: null })}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this service? This action cannot be undone."
        />
      </Box>
    </Box>
  );
}
