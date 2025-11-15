import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Companies from "./pages/Companies";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/services" element={<Services />} />
      <Route path="/bookings" element={<Bookings />} />

      <Route path="*" element={<div style={{ padding: 20 }}>Page not found</div>} />
    </Routes>
  );
}
