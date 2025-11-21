import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

// The component is renamed to EditCompanyDialog based on its usage in Companies.jsx
export default function EditCompanyDialog({ open, onClose, initial, onSave }) {
    // 1. ADD STATE FOR VALIDATION ERRORS
    const [emailError, setEmailError] = useState(''); 
    
    // Original form state (keep as is)
    const [form, setForm] = useState({ name: "", email: "", rating: 0, verified: false, active: true }); 

    useEffect(() => {
        if (initial) {
            setForm(initial);
            // Reset error when dialog opens with new data
            setEmailError(''); 
        }
    }, [initial, open]);

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Handle value parsing for number type
        const val = type === 'checkbox' ? checked : (name === 'rating' ? Number(value) : value);
        
        setForm((prev) => ({ ...prev, [name]: val }));

        // Clear email error on change so user can fix it immediately
        if (name === 'email') {
            setEmailError('');
        }
    };

    // 2. ADD EMAIL VALIDATION FUNCTION
    const validateEmailDomain = (email) => {
        // If the email field is empty, assume it's valid (if it's an optional field)
        if (!email) return '';

        const emailLower = email.toLowerCase();
        const validDomains = ['@gmail.com', '@hotmail.com'];
        const isDomainValid = validDomains.some(domain => emailLower.endsWith(domain));
        
        if (!isDomainValid) {
            return 'Email must be a @gmail.com or @hotmail.com address.';
        }
        return '';
    };


    const handleSave = async () => {
        // Run validation on save
        const error = validateEmailDomain(form.email);
        
        if (error) {
            setEmailError(error); // Set the error state
            return; // Stop the save process
        }
        
        // If validation passes, call the onSave prop from the parent (Companies.jsx)
        onSave(form);

        // Parent component will handle closing logic
        // onClose(); // Removing this as it's typically handled after successful save in parent
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initial?.id ? "Edit Company" : "Create Company"}</DialogTitle>
            <DialogContent sx={{ minWidth: 420, display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                
                {/* Name */}
                <TextField 
                    label="Name" 
                    name="name" 
                    value={form.name} 
                    onChange={handleFormChange} 
                />

                {/* 3. EMAIL FIELD WITH ERROR FEEDBACK */}
                <TextField 
                    label="Email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleFormChange} 
                    // Use error state for visual feedback
                    error={!!emailError} 
                    helperText={emailError} 
                />

                {/* Rating */}
                <TextField 
                    label="Rating" 
                    name="rating" 
                    type="number" 
                    value={form.rating} 
                    onChange={handleFormChange} 
                />

                {/* Verified Checkbox */}
                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={form.verified} 
                            onChange={handleFormChange} 
                            name="verified"
                        />
                    }
                    label="Verified"
                />

                {/* Active Checkbox */}
                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={form.active} 
                            onChange={handleFormChange} 
                            name="active"
                        />
                    }
                    label="Active"
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)} color="inherit">Cancel</Button>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}