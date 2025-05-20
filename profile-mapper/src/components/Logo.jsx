import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import React from "react";
import { allItemsStart } from "../../custom-styles";

const Logo = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box flexGrow={1} sx={{ ...allItemsStart }}>
      <PushPinIcon fontSize={isMobile?"medium":"large"} sx={{ color: "primary.main", mr: isMobile?0.2:1 }} />
      <Typography variant={isMobile?'body1':"h6"} sx={{ fontWeight:600 }}>
        Profile Tracker
      </Typography>
    </Box>
  );
};

export default Logo;
