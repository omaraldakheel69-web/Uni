import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People'; 
import BusinessIcon from '@mui/icons-material/Business'; 
import EventNoteIcon from '@mui/icons-material/EventNote'; 
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbard";
import { listUsers } from "../api/mockApi";
import { listCompanies } from "../api/mockApi";
import { listBookings } from "../api/mockApi";


export default function Dashboard() {
    
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

   
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
            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);
    
    
    const totalUsers = users.length;
    const totalCompanies = companies.length;
    const servicesBooked = bookings.length; 

   
    return (
        <Box sx={{ display: "flex" }}>
            <Topbar />
            <Sidebar />

            <Box 
    component="main" 
    sx={{
        
        minHeight: "100vh",
        
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
        )`, 
        
    }}
>

                <Typography variant="h4" mb={4}> 
                    Dashboard Overview
                </Typography>
                
                {loading ? (
                    <Typography>Loading dashboard data...</Typography>
                ) : (
                    <Grid container spacing={3}>
                        
                        {}
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{
                                p: 3,
                                borderRadius: '12px',
                                textAlign: 'center',
                                
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)', 
                            }}>
                                <PeopleIcon sx={{ color: '#4CAF50', fontSize: 40 }} /> {}
                                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                                    Total Users
                                </Typography>
                                <Typography variant="h2" sx={{ fontWeight: 700, mt: 0.5 }}>
                                    {totalUsers}
                                </Typography>
                            </Paper>
                        </Grid>
                        
                        {}
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
                        
                        {}
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