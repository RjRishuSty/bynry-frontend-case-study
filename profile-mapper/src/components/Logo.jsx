import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import React from "react";
import { allItemsStart } from "../../custom-styles";
import { Link } from "react-router-dom";

const Logo = () => {
  const isMobile = useMediaQuery("(max-width:500px)");
  return (
    <Box flexGrow={1}>
      <Box component={Link} to="/" sx={{ ...allItemsStart }}>
        <IconButton
          sx={{
            backgroundColor: !isMobile ? "custom.buttonBackground" : "",
            borderRadius: 2,
            mr: isMobile ? 0 : 1,
          }}
        >
          <PushPinIcon
            fontSize={isMobile ? "medium" : "large"}
            sx={{ color: "text.primary" }}
          />
        </IconButton>
        {
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {isMobile ? "Tracker" : "Profile Tracker"}
          </Typography>
        }
      </Box>
    </Box>
  );
};

export default Logo;
