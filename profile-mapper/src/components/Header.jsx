import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Button,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Person3Icon from "@mui/icons-material/Person3";
import Logo from "./Logo";
import AppMode from "./AppMode";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = ({ mode, toggleMode }) => {
  const location = useLocation();

  const miniLaptop = useMediaQuery("(max-width:1024px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const admin = location.pathname === "/admin";

  const menuLinks = [
    { id: "home", label: "Home", icon: "" },
    { id: "dashboard", label: "Dashboard", icon: "" },
  ];
  // Filtered menu options
  const filteredLinks = {
    admin: menuLinks.filter((link) => link.id !== "home"),
    home: menuLinks.filter((link) => link.id === "home"),
  };

  const navItems = admin ? filteredLinks.admin : filteredLinks.home;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          py: 0.8,
        }}
      >
        <Toolbar>
          <Logo />
          {!isMobile
            ? navItems.map((link) => (
                <Typography
                  key={link.id}
                  component={NavLink}
                  to={admin ? "/admin" : `/`}
                  variant="body1"
                  sx={{
                    mr: 4,
                    textDecoration: "none",
                    "&.active": {
                      color: "custom.linkMain",
                    },
                    "&:not(.active)": {
                      color: "text.primary",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))
            : ""}

          <Box sx={{ mr: miniLaptop ? 0 : 2 }}>
            <Button
              component={Link}
              to={admin ? "/" : "/admin"}
              variant="contained"
              size="medium"
              sx={{
                mr: 2,
                color: "text.default",
                backgroundColor: "custom.buttonBackground",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
              startIcon={<Person3Icon fontSize="medium" />}
            >
              {admin ? "Home" : "Admin"}
            </Button>
            <AppMode mode={mode} toggleMode={toggleMode} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
