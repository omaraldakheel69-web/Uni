import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Users", icon: <PeopleIcon />, path: "/users" },
    { label: "Companies", icon: <BusinessIcon />, path: "/companies" },
    { label: "Services", icon: <CleaningServicesIcon />, path: "/services" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {menu.map((item) => (
          <ListItem disablePadding key={item.label}>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
