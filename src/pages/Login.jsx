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

  function handleLogin() {
    navigate("/dashboard");
  }

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

        <Stack spacing={2}>
          <TextField
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            type="password"
            label="Password"
            fullWidth
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button variant="contained" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
