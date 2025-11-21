import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ConfirmDialog({ open, title = "Confirm", description = "", onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
       <Button 
    onClick={() => onClose(false)} 
    variant="text" // Use text variant to keep it subtle
    sx={{ 
        color: '#0d0303ff', // A professional dark grey color
        '&:hover': {
            backgroundColor: 'rgba(108, 117, 125, 0.04)', // Slight hover effect
        }
    }}
>
    Cancel
</Button>
        <Button color="error" variant="contained" onClick={() => { onConfirm(); onClose(false); }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
