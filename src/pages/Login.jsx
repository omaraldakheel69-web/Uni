import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    
    const [errors, setErrors] = useState({});

  
    const validateEmail = (email) => {
        const emailLower = email.toLowerCase();
        const validDomains = ['@gmail.com', '@hotmail.com'];
        const isDomainValid = validDomains.some(domain => emailLower.endsWith(domain));

        if (!isDomainValid && email.length > 0) {
            return 'Email must be @gmail.com or @hotmail.com.';
        }
        return '';
    };

    
    const validatePassword = (password) => {
        if (password.length > 0 && password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        return '';
    };

    const handleLogin = (e) => {
        e.preventDefault();

      
        const emailError = validateEmail(form.email);
        const passwordError = validatePassword(form.password);
        
        setErrors({ email: emailError, password: passwordError });

        
        if (emailError || passwordError || form.email.length === 0 || form.password.length === 0) {
            return;
        }

        console.log("Attempting login with:", form.email, " and password length:", form.password.length);
        
       
        navigate("/dashboard");
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
            }}
        >
            <Paper elevation={4} sx={{ p: 4, width: 350 }}>
                <Typography variant="h5" mb={2} textAlign="center">
                    Admin Login
                </Typography>
                
                <Stack spacing={2} component="form" onSubmit={handleLogin}> 
                    {}
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    
                    {}
                    <TextField
                        type="password"
                        label="Password"
                        name="password"
                        fullWidth
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        error={!!errors.password}
                        helperText={errors.password}
                    />

                    <Button variant="contained" fullWidth type="submit"> 
                        Login
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}