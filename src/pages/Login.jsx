import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email) => {
    const emailLower = email.toLowerCase();
    const validDomains = ["@gmail.com", "@hotmail.com"];
    const isDomainValid = validDomains.some((d) => emailLower.endsWith(d));
    if (!isDomainValid && email.length > 0) return "Email must be @gmail.com or @hotmail.com.";
    return "";
  };

  const validatePassword = (password) => {
    if (password.length > 0 && password.length < 8) return "Password must be at least 8 characters long.";
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError || !form.email || !form.password) return;

    try {
      // Send login request to backend on port 3000
      const res = await axios.post("http://localhost:3000/api/login", form, {
        headers: { "Content-Type": "application/json" }
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setLoginError(err.response?.data?.message || "Login failed. Please try again.");
    }
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
          <TextField
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            type="password"
            label="Password"
            fullWidth
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
          />
          {loginError && <Typography color="error">{loginError}</Typography>}
          <Button variant="contained" fullWidth type="submit">
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
