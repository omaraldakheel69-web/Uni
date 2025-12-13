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
  Button,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import EditCompanyDialog from "../Components/EditCompanyDialog";
import ConfirmDialog from "../Components/ConfirmDialog";
import api from "../api/axiousInstance";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [companiesRes, servicesRes] = await Promise.all([
        api.get("/companies"),
        api.get("/services"),
      ]);
      setCompanies(companiesRes.data);
      setServices(servicesRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (payload) => {
    try {
      if (edit.initial?.id) {
        await api.put(`/companies/${edit.initial.id}`, payload);
      } else {
        await api.post("/companies", payload);
      }
      setEdit({ open: false, initial: null });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to save company.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/companies/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete company.");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h4">Companies</Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => setEdit({ open: true, initial: null })}
          >
            New Company
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
                  <TableCell>Email</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Services</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.rating ?? "-"}</TableCell>
                    <TableCell>
                      {c.verified ? (
                        <Chip label="Yes" color="success" size="small" />
                      ) : (
                        <Chip label="No" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      {c.active ? (
                        <Chip label="Active" color="primary" size="small" />
                      ) : (
                        <Chip label="Suspended" size="small" />
                      )}
                    </TableCell>
                    <TableCell>{c.servicesCount || 0}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => setEdit({ open: true, initial: c })}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setConfirm({ open: true, id: c.id })}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <EditCompanyDialog
              open={edit.open}
              initial={edit.initial}
              availableServices={services}
              onClose={() => setEdit({ open: false, initial: null })}
              onSave={handleSave}
            />
            <ConfirmDialog
              open={confirm.open}
              title="Delete Company"
              description="Are you sure you want to delete this company?"
              onClose={(v) => setConfirm((s) => ({ ...s, open: v }))}
              onConfirm={() => handleDelete(confirm.id)}
            />
          </Paper>
        )}
      </Box>
    </Box>
  );
}
