import React, { useState, useEffect } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Button, 
    FormControlLabel, 
    Checkbox,
    Autocomplete, // <-- NEW IMPORT
    Box,          // <-- NEW IMPORT for layout
    Typography    // <-- NEW IMPORT for Rating label (optional but good practice)
} from '@mui/material';


// Ensure you pass availableServices={[...]} from Companies.jsx
export default function EditCompanyDialog({ open, onClose, initial, onSave, availableServices = [] }) {
    
    const [emailError, setEmailError] = useState(''); 
    
    // UPDATED: Added selectedServices to state
    const [form, setForm] = useState({ 
        name: "", 
        email: "", 
        rating: 0, 
        verified: false, 
        active: true,
        selectedServices: [] // To hold the full service objects
    }); 

    useEffect(() => {
        if (initial) {
            // Find the full service objects corresponding to the IDs in initial.services
            const initialServices = (initial.services || []).map(serviceId => 
                availableServices.find(s => s.id === serviceId)
            ).filter(s => s); // Filter out any potentially undefined services

            setForm({
                ...initial,
                // Ensure name is present, default rating to 0 if null/undefined
                rating: initial.rating ?? 0, 
                // Set the selected service objects for the Autocomplete
                selectedServices: initialServices,
            });
            setEmailError(''); 
        } else {
             // Reset form for "Create Company" mode
             setForm({ name: "", email: "", rating: 0, verified: false, active: true, selectedServices: [] });
        }
    }, [initial, open, availableServices]); // Added availableServices to dependencies

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        const val = type === 'checkbox' ? checked : (name === 'rating' ? Number(value) : value);
        
        setForm((prev) => ({ ...prev, [name]: val }));

        if (name === 'email') {
            setEmailError('');
        }
    };
    
    // NEW FUNCTION: Handle change for the Autocomplete component
    const handleServiceChange = (event, newServices) => {
        setForm((prev) => ({
            ...prev,
            selectedServices: newServices, // newServices is an array of service objects
        }));
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
        
        // 1. Extract the IDs from the selected service objects (required by the API)
        const serviceIds = form.selectedServices.map(s => s.id);
        
        // 2. Prepare the final payload, substituting the selectedServices array with IDs
        const payload = {
            ...form,
            services: serviceIds, 
            // Remove the temporary selectedServices field
            selectedServices: undefined 
        };
        
        onSave(payload);
        onClose(); // Close the dialog after successful save attempt
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{initial?.id ? "Edit Company" : "Create Company"}</DialogTitle>
            <DialogContent sx={{ minWidth: 420, display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                
                {/* 1. Name */}
                <TextField 
                    label="Name" 
                    name="name" 
                    value={form.name} 
                    onChange={handleFormChange} 
                    fullWidth
                />

                {/* 2. Email */}
                <TextField 
                    label="Email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleFormChange} 
                    error={!!emailError} 
                    helperText={emailError} 
                    fullWidth
                />

                {/* 3. Rating */}
                <TextField 
                    label="Rating" 
                    name="rating" 
                    type="number" 
                    value={form.rating} 
                    onChange={handleFormChange} 
                    fullWidth
                />
                
                {/* 4. SERVICE SELECTION - NEW UI FIELD */}
                <Autocomplete
                    multiple
                    id="company-services-selection"
                    options={availableServices}
                    // The Autocomplete needs a label for each service object
                    getOptionLabel={(option) => option.name || ""} 
                    // Set the currently selected service objects
                    value={form.selectedServices}
                    // Handle updating the state when selections change
                    onChange={handleServiceChange}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        label="Select Associated Services" 
                        placeholder="Services" 
                      />
                    )}
                    // Option to show a message if no services are available
                    noOptionsText="No services available"
                    fullWidth
                />


                {/* 5. Verified */}
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

                {/* 6. Active */}
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
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#11694C' }}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}