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
  const [edit, setEdit] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const fetchData = async () => {
    const [cRes, sRes] = await Promise.all([
      api.get("/companies"),
      api.get("/services"),
    ]);
    setCompanies(cRes.data);
    setServices(sRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (payload) => {
    if (edit.initial?.id) {
      await api.put(`/companies/${edit.initial.id}`, payload);
    } else {
      await api.post("/companies", payload);
    }
    setEdit({ open: false, initial: null });
    fetchData();
  };

  const handleDelete = async (id) => {
    await api.delete(`/companies/${id}`);
    fetchData();
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

        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Verified</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {companies.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.rating}</TableCell>
                  <TableCell>
                    <Chip label={c.verified ? "Yes" : "No"} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={c.active ? "Active" : "Suspended"}
                      size="small"
                      color={c.active ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>{c.servicesCount}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEdit({ open: true, initial: c })}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setConfirm({ open: true, id: c.id })}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <EditCompanyDialog
          open={edit.open}
          initial={edit.initial}
          services={services}
          onClose={() => setEdit({ open: false, initial: null })}
          onSave={handleSave}
        />

        <ConfirmDialog
          open={confirm.open}
          title="Delete Company"
          description="Are you sure?"
          onClose={(v) => setConfirm((s) => ({ ...s, open: v }))}
          onConfirm={() => handleDelete(confirm.id)}
        />
      </Box>
    </Box>
  );
}
