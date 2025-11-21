import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';


export default function EditCompanyDialog({ open, onClose, initial, onSave }) {
    
    const [emailError, setEmailError] = useState(''); 
    
   
    const [form, setForm] = useState({ name: "", email: "", rating: 0, verified: false, active: true }); 

    useEffect(() => {
        if (initial) {
            setForm(initial);
            
            setEmailError(''); 
        }
    }, [initial, open]);

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        
        const val = type === 'checkbox' ? checked : (name === 'rating' ? Number(value) : value);
        
        setForm((prev) => ({ ...prev, [name]: val }));

       
        if (name === 'email') {
            setEmailError('');
        }
    };

    
    const validateEmailDomain = (email) => {
       
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
        
        const error = validateEmailDomain(form.email);
        
        if (error) {
            setEmailError(error); 
            return; 
        }
        
        
        onSave(form);

        
        
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initial?.id ? "Edit Company" : "Create Company"}</DialogTitle>
            <DialogContent sx={{ minWidth: 420, display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                
                {}
                <TextField 
                    label="Name" 
                    name="name" 
                    value={form.name} 
                    onChange={handleFormChange} 
                />

                {}
                <TextField 
                    label="Email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleFormChange} 
                    
                    error={!!emailError} 
                    helperText={emailError} 
                />

                {}
                <TextField 
                    label="Rating" 
                    name="rating" 
                    type="number" 
                    value={form.rating} 
                    onChange={handleFormChange} 
                />

                {}
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

                {}
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