import React, { useState } from "react";
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
import { allItemsCenter, itemSpacebetween } from "../../custom-styles";
import OnCardHover from "./OnCardHover";

const ProfileCard = ({ profile, onSummaryClick, onViewDetails, useIn }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isInMap = useIn === "inMap";
  // console.log(profile)
  return (
    <Card
      onMouseEnter={() => {
        if (isInMap) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (isInMap) setIsHovered(false);
      }}
      sx={{
        // border:'2px solid red',
        cursor: "pointer",
        // m: isInMap ? 0 : 2,
        ...allItemsCenter,
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "0.3s ease",
        ...(isInMap
          ? ""
          : {
              "&:hover": {
                filter: "brightness(90%)",
              },
            }),
      }}
    >
      {/* TODO:  Hover Overlay for inMap */}
      {isInMap && isHovered && <OnCardHover />}

      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: "100px",
          p: 8,
        }}
      ></Box>

      <CardMedia
        component="img"
        height="250"
        image={profile.profilePic}
        alt={profile.fullName}
        sx={{
          borderRadius: "100%",
          border: "5px solid #fff",
          width: "150px",
          height: "150px",
          mt: -10,
          objectPosition: "center",
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />

      {/* Card Text */}
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {profile.fullName}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: isInMap ? "start" : "center" }}
        >
          {isInMap ? (
            profile.description
          ) : profile.description.length > 45 ? (
            <>
              {profile.description.slice(0, 40)}
              <span
                style={{
                  // color: '#6a4dff',
                  cursor: "pointer",
                  // fontWeight: 'bold',
                  marginLeft: "4px",
                }}
                // onClick={() => {
                //   console.log('Learn more clicked');
                // }}
              >
                ...learn more
              </span>
            </>
          ) : (
            profile.description
          )}
        </Typography>
        {isInMap ? (
          <Box sx={{ mt: 3 }}>
            {/* <Typography>
              <strong>Contact:</strong> {profile.email}
            </Typography> */}
           
          </Box>
        ) : null}

        {!isInMap && (
          <Box sx={{ mt: 2, ...itemSpacebetween }}>
            <Button
              variant="contained"
              onClick={() => onSummaryClick(profile)}
              startIcon={<SummarizeIcon fontSize="medium" />}
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
              endIcon={<InfoIcon fontSize="medium" />}
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
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
