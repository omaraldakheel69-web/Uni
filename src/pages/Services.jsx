import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import ConfirmDialog from "../Components/ConfirmDialog";
import EditCompanyDialog from "../Components/EditCompanyDialog";
import { listServices, createService, updateService, deleteService } from "../api/mockApi";
import EditServiceDialog from "../Components/EditServiceDialog";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  async function load() {
    setLoading(true);
    const s = await listServices();
    setServices(s);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const handleCreate = () => setEdit({ open: true, initial: null });
  const handleEdit = (service) => setEdit({ open: true, initial: service });

  const handleSave = async (payload) => {
    if (edit.initial?.id) {
      await updateService(edit.initial.id, payload);
    } else {
      await createService(payload);
    }
    setEdit({ open: false, initial: null });
    load();
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    load();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4">Services</Typography>
          <Button startIcon={<AddIcon />} variant="contained" onClick={handleCreate}>New Service</Button>
        </Grid>

        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price/hr</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.description}</TableCell>
                  <TableCell>${s.pricePerHour}</TableCell>
                  <TableCell>{s.category}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(s)}><EditIcon /></IconButton>
                    <IconButton size="small" onClick={() => setConfirm({ open: true, id: s.id })}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!loading && services.length === 0 && <Typography sx={{ p: 2 }}>No services yet.</Typography>}
        </Paper>

        <EditServiceDialog open={edit.open} initial={edit.initial} onClose={() => setEdit({ open: false, initial: null })} onSave={handleSave} />
        <ConfirmDialog open={confirm.open} title="Delete Service" description="Delete this service?" onClose={(v) => setConfirm((s) => ({ ...s, open: v }))} onConfirm={() => handleDelete(confirm.id)} />
      </Box>
    </Box>
  );
}
