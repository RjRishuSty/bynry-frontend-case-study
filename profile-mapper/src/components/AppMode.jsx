import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import React from "react";

const AppMode = ({ mode, toggleMode }) => {

    return (
        <IconButton onClick={toggleMode}
            sx={{ backgroundColor: 'custom.buttonBackground', borderRadius: 2,mr:0}} 
        >
            {mode === 'light' ? <Brightness4Icon fontSize="medium" sx={{color: "text.default", }} /> : <WbSunnyIcon fontSize="medium" sx={{color: "text.default"}} />}
        </IconButton>
    );
};

export default AppMode;
