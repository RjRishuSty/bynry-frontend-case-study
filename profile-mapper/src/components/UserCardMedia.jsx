import React from "react";
import { Box, CardMedia } from "@mui/material";

const UserCardMedia = ({ profile, useIn }) => {
  const summary = useIn === "summary";
  const map = useIn === "inMap";
  return (
    <>
      {summary || map ?"":(
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: "100%",
            height: "100px",
            p: 8,
          }}
        />
      )}
      <CardMedia
        component="img"
        image={profile.profilePic}
        alt={profile.fullName}
        sx={{
          borderRadius: "100%",
          border: "4px solid #fff",
          width: map?"50px":"120px",
          height: map?"50px":"120px",
          objectFit:'cover',
          mt: summary||map ? 0 : -10,
          objectPosition: "center",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)", 
          },
        }}
      />
    </>
  );
};

export default UserCardMedia;
