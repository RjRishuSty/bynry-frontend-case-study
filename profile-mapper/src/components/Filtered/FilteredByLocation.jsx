import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Autocomplete,
    Typography,
    Avatar,
    Stack,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import { mockProfiles } from "../../services/dummyUsers";
import mapConfig from "../../lib/dummyUsers";

const FilteredByLocation = () => {
    const [userData, setUserData] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [loading, setLoading] = useState(true);

    const MAPTILER_API_KEY = mapConfig.maptiler.url.split("key=")[1]; // Extract just the key
    const getCityFromCoordinates = async (lat, lng) => {
        const url = `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${MAPTILER_API_KEY}`;
        try {
            const response = await axios.get(url);
            const features = response.data.features;
            console.log(features)
            if (features.length > 0) {
                // Try to extract a city-like name
                const cityFeature = features.find((f) =>
                    f.place_type.includes("place") || f.place_type.includes("locality")
                );
                console.log(cityFeature,"city")
                return cityFeature?.text || features[0].text;
            }
        } catch (error) {
            console.error(`Error fetching city for (${lat}, ${lng}):`, error);
        }
        return "Unknown";
    };

    useEffect(() => {
        const enrichUsersWithCity = async () => {
            const usersWithLocation = mockProfiles.filter((user) => user.location?.lat && user.location?.lng);
            const enrichedUsers = await Promise.all(
                usersWithLocation.map(async (user) => {
                    const city = await getCityFromCoordinates(user.location.lat, user.location.lng);
                    return { ...user, city };
                })
            );
            setUserData(enrichedUsers);
            setLoading(false);
        };

        enrichUsersWithCity();
    }, []);

    const cityOptions = Array.from(
        new Set(userData.map((u) => u.city).filter(Boolean))
    );

    const handleCityChange = (event, newValue) => {
        setSelectedCity(newValue);
    };

    const filteredUsers = userData.filter((user) =>
        user.city?.toLowerCase().includes(selectedCity.toLowerCase())
    );

    if (loading) {
        return (
            <Box p={4} display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Autocomplete
                fullWidth
                freeSolo
                options={cityOptions}
                value={selectedCity}
                onInputChange={handleCityChange}
                renderInput={(params) => (
                    <TextField {...params} label="Filter by City" variant="outlined" />
                )}
                sx={{ mb: 3 }}
            />

            {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                    <Box
                        key={user.id}
                        sx={{ p: 2, mb: 2, border: "1px solid #ccc", borderRadius: 2 }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar src={user.photo} alt={user.name} />
                            <Box>
                                <Typography variant="h6">{user.name}</Typography>
                                <Typography variant="body2">{user.description}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    City: {user.city}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                ))
            ) : (
                <Typography>No users found for "{selectedCity}"</Typography>
            )}
        </Box>
    );
};

export default FilteredByLocation;
