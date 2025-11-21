import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: 1201, 
        // --- ADD THESE TWO LINES FOR THE NEW COLOR ---
        backgroundColor: '#11694C', 
        color: '#ffffff' 
        // ---------------------------------------------
      }}
    >
      <Toolbar>
        <Typography variant="h6" nowrap component="div">
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}