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



const menu = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Users", icon: <PeopleIcon />, path: "/users" },
    { label: "Companies", icon: <BusinessIcon />, path: "/companies" },
    { label: "Services", icon: <CleaningServicesIcon />, path: "/services" },
];

const drawerWidth = 240; 

export default function Sidebar() {
    const navigate = useNavigate();
    const { pathname } = useLocation(); 

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#212529', 
                    color: '#f8f9fa',          
                },
            }}
        >
            <Toolbar /> {}
            <List>
                {menu.map((item) => (
                    <ListItem 
                        key={item.label} 
                        disablePadding 
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton 
                            onClick={() => navigate(item.path)}
                            
                            selected={pathname === item.path} 
                            
                            
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5,
                                
                                
                                '&:hover': {
                                    backgroundColor: '#495057', 
                                },
                                
                                
                                '&.Mui-selected': {
                                    backgroundColor: '#11694C.', 
                                    color: '#ffffff',
                                    fontWeight: 'bold',

                                    
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