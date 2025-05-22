import React from 'react'
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton } from '@mui/material';

const FullScreen = () => {
  return (
    <IconButton sx={{ backgroundColor: 'custom.buttonBackground', borderRadius: 2,mr:2 }}>
      <FullscreenIcon fontSize='medium' sx={{ color: "text.default", }} />
    </IconButton>
  )
}

export default FullScreen