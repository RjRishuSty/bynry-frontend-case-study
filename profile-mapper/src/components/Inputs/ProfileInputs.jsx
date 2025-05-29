import { Button } from "@mui/material";
import React, { useRef } from "react";

const ProfileInputs = ({ handlerPictureChange, profilePicture }) => {
  const inputRef = useRef(null);

  const handleSetProfilePic = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        component="div"
        fullWidth
        onClick={handleSetProfilePic}
        sx={{ color: "text.primary", textTransform: "capitalize" }}
      >
        {profilePicture?.name || "Upload Profile Picture"}
        <input
          type="file"
          ref={inputRef}
          name="profilePic"
          hidden
          onChange={handlerPictureChange}
        />
      </Button>
    </>
  );
};

export default ProfileInputs;
