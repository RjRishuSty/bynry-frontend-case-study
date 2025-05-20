import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Person3Icon from "@mui/icons-material/Person3";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "./Logo";
import AppMode from "./AppMode";

const Header = ({ mode, toggleMode }) => {
  const miniLaptop = useMediaQuery("(max-width:1024px)");
  const isMobile = useMediaQuery("(max-width:600px)");

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
          <Box sx={{ mr: miniLaptop ? 0 : 5, px: miniLaptop ? 0 : 3, }}>
            {!isMobile ? <>
              <Button
                // component={Link}
                to="/profile"
                variant="contained"
                size="medium"
                sx={{ mr: 2, color: "text.default", backgroundColor: 'custom.buttonBackground' }}
                startIcon={
                  <Person3Icon fontSize="medium" />
                }
              >
                Profile
              </Button>
              <Button
                // onClick={handlerLogout}
                variant="contained"
                size="medium"
                sx={{ mr: 2, color: "text.default", backgroundColor: 'custom.buttonBackground' }}
                endIcon={
                  <LogoutIcon fontSize="medium" />
                }
              >
                Logout
              </Button>
            </> : null}
            <AppMode mode={mode} toggleMode={toggleMode} />
          </Box>
          {/* <AppMode /> */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{  display: { sm: "none" } }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
