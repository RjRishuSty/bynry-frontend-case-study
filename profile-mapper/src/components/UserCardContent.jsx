import { Box, Chip, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import SocalMediaIcons from "./SocalMediaIcons";

const UserCardContent = ({ profile, useIn }) => {
  const isTablet = useMediaQuery("(max-width:914px)");
  if (!profile) return;
  const location = [
    { label: "Country", value: profile.country },
    { label: "State", value: profile.state },
    { label: "City", value: profile.city },
  ];
  const summary = useIn === "summary";
  // const card = useIn ==='card';
  return (
    <>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            textAlign: summary ? "start" : "center",
            textTransform: "uppercase",
          }}
        >
          {summary ? "Summary" : profile.fullName}
        </Typography>
      </Box>
      <Typography
        variant={summary ? "body1" : "body2"}
        color="text.secondary"
        sx={{ textAlign: summary ? "start" : "center" }}
      >
        {summary ? (
          profile.description
        ) : profile.description.length > 45 ? (
          <>
            {profile.description.slice(0, 40)}
            <span style={{ cursor: "pointer", marginLeft: "4px" }}>
              ...learn more
            </span>
          </>
        ) : (
          profile.description
        )}
      </Typography>
      {summary && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
            <strong>Email:-</strong>{" "}
            <Chip
              label={profile.email}
              variant="outlined"
              sx={{ fontSize: "1rem" }}
            />
          </Typography>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{ mt: 2 }}>
            {location?.map((item) => (
              <Grid
                key={item.label}
                size={{ xs: 12, sm: 4, md: 4 }}
                sx={{ backgroundColor: "primary.main", p: 1.5, borderRadius: 2 }}
              >
                <Typography sx={{color:'text.optional'}}><strong>{item.label} :-</strong> {item.value}</Typography>
              </Grid>
            ))}
          </Grid>
          {isTablet && (
            <Box sx={{mt:3}}>
              <SocalMediaIcons />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default UserCardContent;
