import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

export default function EditCompanyDialog({ open, onClose, initial, services, onSave }) {
  const [form, setForm] = useState({
    email: "",
    rating: 0,
    verified: false,
    active: true,
    services: [],
  });

  useEffect(() => {
    if (initial) {
      setForm({
        email: initial.email,
        rating: initial.rating,
        verified: initial.verified,
        active: initial.active,
        services: initial.services || [],
      });
    }
  }, [initial]);

  const toggleService = (id) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initial ? "Edit Company" : "Create Company"}</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Rating" type="number" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />

        <FormControlLabel control={<Checkbox checked={form.verified} onChange={(e) => setForm({ ...form, verified: e.target.checked })} />} label="Verified" />
        <FormControlLabel control={<Checkbox checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />} label="Active" />

        <strong>Services</strong>
        {services.map((s) => (
          <FormControlLabel
            key={s.id}
            control={<Checkbox checked={form.services.includes(s.id)} onChange={() => toggleService(s.id)} />}
            label={s.name}
          />
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
