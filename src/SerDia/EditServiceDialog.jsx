import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function EditServiceDialog({ open, onClose, initial, onSave }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    pricePerHour: "",
    category: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        description: initial.description || "",
        pricePerHour: initial.pricePerHour || "",
        category: initial.category || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        pricePerHour: "",
        category: "",
      });
    }
  }, [initial, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.description || !form.pricePerHour || !form.category) {
      alert("Please fill in all fields.");
      return;
    }

    onSave({
      ...form,
      pricePerHour: Number(form.pricePerHour),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initial?.id ? "Edit Service" : "Create Service"}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Price per Hour"
          name="pricePerHour"
          type="number"
          value={form.pricePerHour}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
