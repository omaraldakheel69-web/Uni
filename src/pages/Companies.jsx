import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import ConfirmDialog from "../Components/ConfirmDialog";
import EditCompanyDialog from "../Components/EditCompanyDialog";
import { listCompanies, createCompany, updateCompany, deleteCompany, listServices } from "../api/mockApi";
import RatingIcon from '@mui/icons-material/StarRate';
import VerifiedIcon from '@mui/icons-material/VerifiedUser';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work'; 
import SettingsIcon from '@mui/icons-material/Settings'; 


export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  async function load() {
    setLoading(true);
    const [c, s] = await Promise.all([listCompanies(), listServices()]);
    setCompanies(c);
    setServices(s);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const handleCreate = () => setEdit({ open: true, initial: null });
  const handleEdit = (company) => setEdit({ open: true, initial: company });

  const handleSave = async (payload) => {
    if (edit.initial?.id) {
      await updateCompany(edit.initial.id, payload);
    } else {
      await createCompany({ ...payload, services: [] });
    }
    setEdit({ open: false, initial: null });
    load();
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);
    load();
  };

  return (
    <Box component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    mt: 8,
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ffffff 0%, #f3f6fa 100%)",
  }}>
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4">Companies</Typography>
          <Button 
    startIcon={<AddIcon />} 
    variant="contained" 
    onClick={handleCreate}
    sx={{
        backgroundColor: '#11694C', 
        '&:hover': {
            backgroundColor: '#0c5c3b', 
        }
    }}
>
    New Company
</Button>
        </Grid>

        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
    <TableRow>
        <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1, fontSize: 18 }} /> Email
            </Box>
        </TableCell>
        <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <RatingIcon sx={{ mr: 1, fontSize: 18 }} /> Rating
            </Box>
        </TableCell>
        <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <VerifiedIcon sx={{ mr: 1, fontSize: 18 }} /> Verified
            </Box>
        </TableCell>
        <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ToggleOnIcon sx={{ mr: 1, fontSize: 18 }} /> Active
            </Box>
        </TableCell>
        <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkIcon sx={{ mr: 1, fontSize: 18 }} /> Services
            </Box>
        </TableCell>
        <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SettingsIcon sx={{ mr: 1, fontSize: 18 }} /> Actions
            </Box>
        </TableCell>
    </TableRow>
</TableHead>

            <TableBody>
              {companies.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.rating ?? "-"}</TableCell>
                  <TableCell>{c.verified ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" size="small" />}</TableCell>
                  <TableCell>{c.active ? <Chip label="Active" color="primary" size="small" /> : <Chip label="Suspended" size="small" />}</TableCell>
                  <TableCell>{(c.services || []).length}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(c)}><EditIcon /></IconButton>
                    <IconButton size="small" onClick={() => setConfirm({ open: true, id: c.id })}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {loading && <Typography sx={{ p: 2 }}>Loading...</Typography>}
          {!loading && companies.length === 0 && <Typography sx={{ p: 2 }}>No companies yet.</Typography>}
        </Paper>

        <EditCompanyDialog open={edit.open} initial={edit.initial} onClose={() => setEdit({ open: false, initial: null })} onSave={handleSave} />
        <ConfirmDialog open={confirm.open} title="Delete Company" description="Are you sure you want to delete this company? This action cannot be undone." onClose={(v) => setConfirm((s) => ({ ...s, open: v }))} onConfirm={() => handleDelete(confirm.id)} />
      </Box>
    </Box>
  );
}
