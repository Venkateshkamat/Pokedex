import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar: React.FC = () => {
  return (
    <AppBar className="navbar">
      <Toolbar className="toolbar">
        {/* Pokémon Logo */}
        <Box className="logo-container">
          <h2 className="logo">P o k e D E X</h2>
        </Box>

        {/* Navigation Links */}
        <Box className="nav-links">
          <Button component={Link} to="/mp2/gallery" color="inherit">
            Gallery
          </Button>
          <Button component={Link} to="/mp2/" color="inherit">
            ListView
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
