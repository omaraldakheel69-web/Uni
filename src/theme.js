// theme.js
import { createTheme } from "@mui/material/styles"; // Note: Use /styles for modern MUI v5+

// Your desired deep forest green
const deepForestGreen = "#11694C"; 

const theme = createTheme({
    palette: {
        // --- 1. SET PRIMARY COLOR TO YOUR CUSTOM GREEN ---
        primary: { 
            main: deepForestGreen,
        },
        // --- 2. Keep secondary and background as is if you like them ---
        secondary: { 
            main: "#11694C" 
        },
        background: { 
            default: "#F4F5F7" 
        },
    },
    shape: { 
        borderRadius: 12 
    },
    
    // --- 3. GLOBAL FIX FOR BLINKING CURSOR ---
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                /* Disable cursor globally */
                body, * {
                    caret-color: transparent !important;
                }
                /* Re-enable cursor ONLY for input fields */
                input:focus, textarea:focus, [contenteditable="true"]:focus {
                    caret-color: ${deepForestGreen} !important; 
                }
                
                /* Optional: Set scrollbar color for modern browsers */
                ::-webkit-scrollbar-thumb {
                    background-color: ${deepForestGreen}20; /* 20 is transparency */
                    border-radius: 10px;
                }
            `,
        },
        // Optional: Ensure all contained buttons use the primary color by default
        MuiButton: {
            defaultProps: {
                disableElevation: true, // Recommended for a flatter look
            },
        },
    },
    // ------------------------------------------------------------------
});

export default theme;