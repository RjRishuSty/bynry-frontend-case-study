import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import MapView from '../components/MapView';
import ProfileDetails from '../components/ProfileDetails';
import { getProfiles } from '../services/api';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfiles().then((data) => {
      setProfiles(data);
      setLoading(false);
    });
  }, []);

  const handleSummaryClick = (profile) => setSelectedProfile(profile);
  const handleViewDetails = (profile) => setSelectedProfile(profile);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Team Profiles</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container >
          {profiles.map((profile) => (
            <Grid size={{xs:12,sm:4,md:3}} key={profile.id} sx={{border:'2px solid red'}}>
              <ProfileCard
                profile={profile}
                onSummaryClick={handleSummaryClick}
                onViewDetails={handleViewDetails}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {selectedProfile && (
        <>
          <Typography variant="h5" mt={4}>📍 Location: {selectedProfile.name}</Typography>
          <MapView
            location={selectedProfile.location}
            label={`📍 ${selectedProfile.name}'s location`}
          />
          <ProfileDetails profile={selectedProfile} />
        </>
      )}
    </Box>
  );
};

export default Home;