import React from 'react';
import { Box, Typography } from '@mui/material';

const ProfileDetails = ({ profile }) => (
  <Box sx={{ mt: 4, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
    <Typography variant="h6">Details for {profile.name}</Typography>
    <Typography><strong>Contact:</strong> {profile.contact}</Typography>
    <Typography><strong>Interests:</strong> {profile.interests}</Typography>
  </Box>
);

export default ProfileDetails;
