import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

export default function EditCompanyDialog({ open, onClose, initial = {}, onSave }) {
  const [form, setForm] = useState({ name: "", email: "", rating: 0, verified: false, active: true });

  useEffect(() => {
    if (initial) setForm({ ...form, ...initial });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial, open]);

  const handleChange = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [k]: e.target.type === "number" ? Number(val) : val }));
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{initial?.id ? "Edit Company" : "Create Company"}</DialogTitle>
      <DialogContent sx={{ minWidth: 420, display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Name" value={form.name} onChange={handleChange("name")} />
        <TextField label="Email" value={form.email} onChange={handleChange("email")} />
        <TextField label="Rating" type="number" value={form.rating} onChange={handleChange("rating")} />
        <FormControlLabel control={<Checkbox checked={form.verified} onChange={handleChange("verified")} />} label="Verified" />
        <FormControlLabel control={<Checkbox checked={form.active} onChange={handleChange("active")} />} label="Active" />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={() => onSave(form)} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
