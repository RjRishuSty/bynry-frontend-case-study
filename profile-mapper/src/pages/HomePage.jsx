import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Grid, Typography, Stack, useMediaQuery } from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import MapView from "../components/MapView";
import { useSelector } from "react-redux";
import { allItemsCenter } from "../../custom-styles";

const HomePage = () => {
  const miniLaptop = useMediaQuery("(max-width:1010px)");
  const isMobile = useMediaQuery("(max-width:735px)");
  const userData = useSelector((state) => state.users.userData);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [userSummary, setUserSummary] = useState(false);
  const cardRef = useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userSummary]);
  const handleSummaryClick = useCallback((profile) => {
    setSelectedProfile(profile);
    setUserSummary(true);
  }, []);

  const handleViewDetails = useCallback((profile) => {
    setSelectedProfile(profile);
    setUserSummary(false);
  }, []);
  return (
    <Stack sx={{ mt: 15 }}>
      <Box>
        <Box p={4} sx={{ ...allItemsCenter, flexDirection: "column" }}>
          <Typography variant="h4" gutterBottom>
            Meet Our Team
          </Typography>
          <Typography
            variant="body1"
            sx={{
              width: miniLaptop ? (isMobile ? "100%" : "70%") : "50%",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Behind every success story is a team of committed professionals. Our
            team brings deep expertise, integrity, and a shared mission to
            deliver exceptional results.
          </Typography>

          <Grid container rowSpacing={2} columnSpacing={2} sx={{ mt: 4 }}>
            {userData.map((profile) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={profile.id}>
                <ProfileCard
                  profile={profile}
                  onSummaryClick={handleSummaryClick}
                  onViewDetails={handleViewDetails}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {userSummary && selectedProfile && (
          <Box
            ref={cardRef}
            sx={{ backgroundColor: "primary.main", py: 10, mt: 5 }}
          >
            <Grid container spacing={2}>
              <Grid
                size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                sx={{
                  // border: "3px solid blue",
                  p: { md: 4 },
                  order: { xs: 2, sm: 2, md: 2, lg: 1 },
                }}
              >
                <ProfileCard profile={selectedProfile} useIn="summary" />
              </Grid>
            </Grid>
          </Box>
        )}

        {selectedProfile && !userSummary && (
          <Box sx={{ mt: 5 }}>
            <Grid container>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <MapView
                  selectedProfile={selectedProfile}
                  label={
                    <ProfileCard profile={selectedProfile} useIn="inMap" />
                  }
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default HomePage;
