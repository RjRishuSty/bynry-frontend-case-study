import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import InfoIcon from "@mui/icons-material/Info";
import { itemSpacebetween } from "../../custom-styles";

const ProfileCard = ({ profile, onSummaryClick, onViewDetails }) => (
  <Card
    fullWidth
    sx={{
      cursor: "pointer",
      m: 2,
      filter: "brightness(95%)",
      "&:hover": {
        filter: "brightness(110%)",
      },
    }}
  >
    <CardMedia
      component="img"
      height="250"
      image={profile.photo}
      alt={profile.name}
      sx={{
        objectPosition: "center",
        objectFit: "cover",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    />
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {profile.name}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {profile.description}
      </Typography>
      <Box sx={{ ...itemSpacebetween }}>
        <Button
          variant="contained"
          onClick={() => onSummaryClick(profile)}
          startIcon={<SummarizeIcon fonstSize="medium" />}
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
          endIcon={<InfoIcon fonstSize="medium" />}
          sx={{ mt: 1, ml: 2, fontWeight: 600, textTransform: "capitalize" }}
        >
          View Details
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default ProfileCard;
