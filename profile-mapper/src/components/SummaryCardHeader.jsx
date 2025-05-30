import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import SocalMediaIcons from "./SocalMediaIcons";
import { allItemEnd } from "../../custom-styles";

const SummaryCardHeader = ({ profile }) => {
  const isTablet = useMediaQuery("(max-width:914px)");
  const isMobile = useMediaQuery("(max-width:485px)");
  return (
    <>
      <Box sx={{ width: "100%", ml:isMobile?2: 3 }}>
        <Typography
          variant={isMobile?"h5":"h4"}
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "text.optional",
          }}
        >
          {profile.fullName}
        </Typography>
        <Grid container>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Button
              variant="contained"
              size={isMobile?"small":'large'}
              component="div"
              sx={{
                backgroundColor: "#ccffcc",
                color: "#00cc00",
                textTransform: "capitalize",
              }}
              startIcon={
                <VerifiedIcon fontSize="large" sx={{ color: "#00cc00" }} />
              }
            >
              {isMobile?"Verified":"100% Verified"}
            </Button>
          </Grid>
          {!isTablet && (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ ...allItemEnd }}>
              <SocalMediaIcons />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default SummaryCardHeader;
