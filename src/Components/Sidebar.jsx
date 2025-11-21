import React from 'react';
import { 
    Drawer, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    Toolbar 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { useNavigate, useLocation } from 'react-router-dom';


// Define the menu structure
const menu = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Users", icon: <PeopleIcon />, path: "/users" },
    { label: "Companies", icon: <BusinessIcon />, path: "/companies" },
    { label: "Services", icon: <CleaningServicesIcon />, path: "/services" },
];

const drawerWidth = 240; // Optional: Define your drawer width

export default function Sidebar() {
    const navigate = useNavigate();
    const { pathname } = useLocation(); // Get the current URL path

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#212529', // Dark background
                    color: '#f8f9fa',          // Light text color
                },
            }}
        >
            <Toolbar /> {/* Adds space to sit below the Topbar */}
            <List>
                {menu.map((item) => (
                    <ListItem 
                        key={item.label} 
                        disablePadding 
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton 
                            onClick={() => navigate(item.path)}
                            // --- ACTIVE STATE LOGIC ---
                            selected={pathname === item.path} 
                            
                            // --- STYLING ---
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5,
                                
                                // Default (Inactive) Hover Style
                                '&:hover': {
                                    backgroundColor: '#495057', 
                                },
                                
                                // Active State (Green Background)
                                '&.Mui-selected': {
                                    backgroundColor: '#11694C.', 
                                    color: '#ffffff',
                                    fontWeight: 'bold',

                                    // Override active state hover
                                    '&:hover': {
                                        backgroundColor: '#11694C.', 
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: 3,
                                    justifyContent: 'center',
                                    // Change icon color based on active state
                                    color: pathname === item.path ? '#ffffff' : '#f8f9fa',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}