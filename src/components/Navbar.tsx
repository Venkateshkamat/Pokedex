import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
import logo from "../assets/gaming.png"

const Navbar: React.FC = () => {
  return (
    <AppBar className="navbar">
      <Toolbar className="toolbar">
        {/* Pokémon Logo */}
        <Box className="logo-container">
        <Button component={Link} to="/mp2/" >
        <img src={logo} alt="Pikachu Logo" className="logo-img" />
          </Button>
          
        </Box>

        {/* Navigation Links */}
        <Box className="nav-links">
          <Button component={Link} to="/mp2/gallery" className="btn" >
            Gallery
          </Button>
          <Button component={Link} to="/mp2/" className="btn">
            ListView
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
