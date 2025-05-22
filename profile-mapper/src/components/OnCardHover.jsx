
import { Box, Typography } from '@mui/material'
import React from 'react'
import SocalMediaIcons from './SocalMediaIcons'
import { itemSpacebetween } from '../../custom-styles'

const OnCardHover = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'custom.onHover',
        width: '100%',
        height: '100%',
        ...itemSpacebetween,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        opacity: 0.9,
        transition: '0.3s',
        p:5
      }}
    >
     <SocalMediaIcons/>
    </Box>
  )
}

export default OnCardHover