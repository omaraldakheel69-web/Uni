import React, { useEffect, useState, useRef } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box, 
  Typography,
  InputAdornment 
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; 

export default function EditServiceDialog({ open, onClose, initial = {}, onSave }) {
    
  // State for form fields
  const [form, setForm] = useState({ 
    name: "", 
    description: "", 
    pricePerHour: 0, 
    category: "" 
  }); 

  const [imageFile, setImageFile] = useState(null); 
  const fileInputRef = useRef(null);

  // =========================================================
  // Validation logic
  // =========================================================
  const isFormValid = () => {
    // All text fields must be non-empty
    if (!form.name.trim() || !form.description.trim() || !form.category.trim()) return false;

    // Price must be a number > 0
    if (Number(form.pricePerHour) <= 0 || isNaN(Number(form.pricePerHour))) return false;

    // If creating a new service, image is required
    if (!initial?.id && !imageFile) return false;

    return true;
  };
  // =========================================================

  useEffect(() => {
    if (open) {
      // Populate form from initial service if editing
      setForm({
        name: initial?.name ?? "",
        description: initial?.description ?? "",
        pricePerHour: initial?.pricePerHour ?? initial?.price_per_hour ?? 0,
        category: initial?.category ?? ""
      });

      setImageFile(null); 
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  }, [initial, open]);

  const handleChange = (k) => (e) => {
    const value = e.target.value;
    setForm((s) => ({ ...s, [k]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file || null);
  };
    
  const handleSave = () => {
    if (!isFormValid()) return;

    const payload = { ...form, imageFile };
    onSave(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{initial?.id ? "Edit Service" : "Create Service"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

        <TextField 
          label="Name" 
          value={form.name} 
          onChange={handleChange("name")} 
          fullWidth
          required
          error={open && !form.name.trim()}
          helperText={open && !form.name.trim() ? "Name is required" : ""}
        />

        <TextField 
          label="Description" 
          value={form.description} 
          onChange={handleChange("description")} 
          fullWidth
          required
          error={open && !form.description.trim()}
          helperText={open && !form.description.trim() ? "Description is required" : ""}
        />

        <TextField 
          label="Price Per Hour" 
          type="number" 
          value={form.pricePerHour} 
          onChange={handleChange("pricePerHour")} 
          fullWidth
          required
          error={open && (Number(form.pricePerHour) <= 0 || isNaN(Number(form.pricePerHour)))}
          helperText={open && (Number(form.pricePerHour) <= 0 || isNaN(Number(form.pricePerHour))) ? "Price must be greater than zero" : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField 
          label="Category" 
          value={form.category} 
          onChange={handleChange("category")} 
          fullWidth
          required
          error={open && !form.category.trim()}
          helperText={open && !form.category.trim() ? "Category is required" : ""}
        />

        <Box sx={{ mt: 1 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            fullWidth
            onClick={() => fileInputRef.current.click()} 
            startIcon={<CloudUploadIcon />}
            color={(!initial?.id && !imageFile && open) ? 'error' : 'primary'}
          >
            {imageFile?.name ? `File Selected: ${imageFile.name}` : "Upload Service Picture"}
          </Button>
          {(!initial?.id && !imageFile && open) && (
            <Typography variant="caption" color="error" sx={{ ml: 1, mt: 0.5 }}>
              Image is required for new services.
            </Typography>
          )}
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text" sx={{ color: '#0d0303ff' }}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={!isFormValid()} // <-- Save disabled until all fields are valid
          sx={{ backgroundColor: '#11694C', '&:hover': { backgroundColor: '#0c5c3b' } }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
