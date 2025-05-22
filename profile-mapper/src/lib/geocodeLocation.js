// lib/geocodeLocation.js
import axios from "axios";
// This api key for => opencagedata.com
const API_KEY = "bc3331766ef24287976dfd62b4c91848";

export const geocodeLocation = async ({ country, state, city }) => {
  const query = [city, state, country].filter(Boolean).join(", ");

  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json`,
    {
      params: {
        q: query,
        key: API_KEY,
      },
    }
  );

  const result = response.data.results[0];
  if (result) {
    return {
      lat: result.geometry.lat,
      lng: result.geometry.lng,
    };
  } else {
    throw new Error("Geocoding failed");
  }
};
