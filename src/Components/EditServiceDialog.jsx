import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

export default function EditServiceDialog({ open, onClose, initial = {}, onSave }) {
  const [form, setForm] = useState({ name: "", description: "", pricePerHour: 0, category: "" });

  useEffect(() => {
    if (initial) setForm({ ...form, ...initial });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial, open]);

  const handleChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.type === "number" ? Number(e.target.value) : e.target.value }));

  const handleSave = async () => {
    try {
      const response = await fetch(initial?.id ? `/api/services/${initial.id}` : "/api/services", {
        method: initial?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      onSave(data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{initial?.id ? "Edit Service" : "Create Service"}</DialogTitle>
      <DialogContent sx={{ minWidth: 420, display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Name" value={form.name} onChange={handleChange("name")} />
        <TextField label="Description" value={form.description} onChange={handleChange("description")} />
        <TextField label="Price Per Hour" type="number" value={form.pricePerHour} onChange={handleChange("pricePerHour")} />
        <TextField label="Category" value={form.category} onChange={handleChange("category")} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
