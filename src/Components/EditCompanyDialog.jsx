import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";

export default function EditCompanyDialog({
  open,
  onClose,
  initial,
  onSave,
  availableServices = [],
}) {
  const [form, setForm] = useState({
    email: "",
    rating: 0,
    verified: false,
    active: true,
    selectedServices: [],
  });

  useEffect(() => {
    if (initial) {
      const selectedServices = (initial.services || []).map((id) =>
        availableServices.find((s) => s.id === id)
      ).filter(Boolean);
      setForm({
        email: initial.email,
        rating: initial.rating ?? 0,
        verified: initial.verified ?? false,
        active: initial.active ?? true,
        selectedServices,
      });
    } else {
      setForm({
        email: "",
        rating: 0,
        verified: false,
        active: true,
        selectedServices: [],
      });
    }
  }, [initial, open, availableServices]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "rating"
          ? Number(value)
          : value,
    }));
  };

  const handleServiceChange = (event, newServices) => {
    setForm((prev) => ({ ...prev, selectedServices: newServices }));
  };

  const handleSave = () => {
    if (!form.email) {
      alert("Please fill in all fields.");
      return;
    }
    const payload = {
      ...form,
      services: form.selectedServices.map((s) => s.id),
      selectedServices: undefined,
    };
    onSave(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial ? "Edit Company" : "Create Company"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={form.rating}
          onChange={handleChange}
          fullWidth
        />
        <Autocomplete
          multiple
          options={availableServices}
          getOptionLabel={(option) => option.name || ""}
          value={form.selectedServices}
          onChange={handleServiceChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.name} {option.pricePerHour ? `($${option.pricePerHour})` : ""}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select Services" placeholder="Services" />
          )}
        />
        <FormControlLabel
          control={<Checkbox checked={form.verified} onChange={handleChange} name="verified" />}
          label="Verified"
        />
        <FormControlLabel
          control={<Checkbox checked={form.active} onChange={handleChange} name="active" />}
          label="Active"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#11694C" }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
