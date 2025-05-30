import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Container,
} from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import InfoIcon from "@mui/icons-material/Info";
import {
  allItemsCenter,
  allItemsStart,
  itemSpacebetween,
} from "../../custom-styles";
import UserCardMedia from "./UserCardMedia";
import UserCardContent from "./UserCardContent";
import SummaryCardHeader from "./SummaryCardHeader";

const ProfileCard = ({ profile, onSummaryClick, onViewDetails, useIn }) => {
  const renderContent = () => {
    switch (useIn) {
      case "summary":
        return (
          <Container>
            <Grid container>
              <Grid
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{
                  p: 5,
                  backgroundColor: "text.secondary",
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                  ...allItemsStart,
                }}
              >
                <UserCardMedia profile={profile} useIn="summary" />
                <SummaryCardHeader profile={profile} />
              </Grid>
              <Grid
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{
                  backgroundColor: "background.paper",
                  p: 2,
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              >
                <UserCardContent profile={profile} useIn="summary" />
              </Grid>
            </Grid>
          </Container>
        );
      case "inMap":
        return (
          <Card sx={{ width: "100%", border: "2px solid blue" }}>
            <UserCardMedia profile={profile} useIn="inMap" />
            <CardContent sx={{bordeR:'5px solid black'}}>
              <Typography variant="body1" color="#000">
                {profile.name}
              </Typography>
            </CardContent>
          </Card>
        );
      default:
        return (
          <>
            <UserCardMedia profile={profile} />
            <CardContent>
              <UserCardContent profile={profile} useIn="card" />
              <Box sx={{ mt: 2, ...itemSpacebetween }}>
                <Button
                  variant="contained"
                  onClick={() => onSummaryClick(profile)}
                  startIcon={<SummarizeIcon />}
                  sx={{
                    mt: 1,
                    color: "text.default",
                    backgroundColor: "custom.buttonBackground",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  Summary
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => onViewDetails(profile)}
                  endIcon={<InfoIcon />}
                  sx={{
                    mt: 1,
                    ml: 2,
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </>
        );
    }
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        ...allItemsCenter,
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "0.3s ease",
        backgroundColor: useIn === "summary" ? "transparent" : "",
        border: useIn === "summary" ? "none" : "",
        boxShadow: useIn === "summary" ? "none" : "",
        ...(useIn !== "summary"
          ? {
              "&:hover": {
                filter: "brightness(95%)",
              },
            }
          : {}),
      }}
    >
      {renderContent()}
    </Card>
  );
};

export default ProfileCard;
