import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
// --- ICON IMPORTS ---
import PeopleIcon from '@mui/icons-material/People'; 
import BusinessIcon from '@mui/icons-material/Business'; 
import EventNoteIcon from '@mui/icons-material/EventNote'; 

// --- COMPONENT IMPORTS ---
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";

// --- API IMPORTS (ADJUST PATHS AS NEEDED) ---
// I'm guessing these based on your other files (like Bookings.jsx)
// You may need to create an API file that consolidates these calls.
// If you don't have separate API calls, you'll need to load the data here.
import { listUsers } from "../api/mockApi";
import { listCompanies } from "../api/mockApi";
import { listBookings } from "../api/mockApi";


export default function Dashboard() {
    // --- STATE MANAGEMENT ---
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- DATA FETCHING ---
    const loadData = async () => {
        try {
            const [usersData, companiesData, bookingsData] = await Promise.all([
                listUsers(),
                listCompanies(),
                listBookings()
            ]);
            setUsers(usersData);
            setCompanies(companiesData);
            setBookings(bookingsData);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            // Handle error, maybe show a message to the user
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);
    
    // --- DERIVED METRICS ---
    const totalUsers = users.length;
    const totalCompanies = companies.length;
    const servicesBooked = bookings.length; // Assuming bookings.length is the count you want

    // --- RENDER LOGIC ---
    return (
        <Box sx={{ display: "flex" }}>
            <Topbar />
            <Sidebar />

            <Box 
    component="main" 
    sx={{
        // ... other styles
        minHeight: "100vh",
        // --- CORRECTED STYLE ---
        background: `repeating-linear-gradient(
            0deg,
            #f2f2f2ff,
            #f2f2f2 1px,
            #ffffff 1px,
            #ffffff 100px
        ), repeating-linear-gradient(
            90deg,
            #f2f2f2,
            #f2f2f2 1px,
            #ffffff 1px,
            #ffffff 100px
        )`, // <--- The string ends here with a closing backtick
        // -----------------------
    }}
>

                <Typography variant="h4" mb={4}> 
                    Dashboard Overview
                </Typography>
                
                {loading ? (
                    <Typography>Loading dashboard data...</Typography>
                ) : (
                    <Grid container spacing={3}>
                        
                        {/* *** 1. Users Card *** */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{
                                p: 3,
                                borderRadius: '12px',
                                textAlign: 'center',
                                // Optional: make the shadow a bit softer
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)', 
                            }}>
                                <PeopleIcon sx={{ color: '#4CAF50', fontSize: 40 }} /> {/* Use a standard green */}
                                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                                    Total Users
                                </Typography>
                                <Typography variant="h2" sx={{ fontWeight: 700, mt: 0.5 }}>
                                    {totalUsers}
                                </Typography>
                            </Paper>
                        </Grid>
                        
                        {/* *** 2. Companies Card *** */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{
                                p: 3,
                                borderRadius: '12px',
                                textAlign: 'center',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                            }}>
                                <BusinessIcon sx={{ color: '#11694C.', fontSize: 40 }} />
                                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                                    Companies
                                </Typography>
                                <Typography variant="h2" sx={{ fontWeight: 700, mt: 0.5 }}>
                                    {totalCompanies}
                                </Typography>
                            </Paper>
                        </Grid>
                        
                        {/* *** 3. Bookings Card *** */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{
                                p: 3,
                                borderRadius: '12px',
                                textAlign: 'center',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                            }}>
                                <EventNoteIcon sx={{ color: '#11694C.', fontSize: 40 }} />
                                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                                    Services Booked
                                </Typography>
                                <Typography variant="h2" sx={{ fontWeight: 700, mt: 0.5 }}>
                                    {servicesBooked}
                                </Typography>
                            </Paper>
                        </Grid>
                        
                    </Grid>
                )}
            </Box>
        </Box>
    );
}