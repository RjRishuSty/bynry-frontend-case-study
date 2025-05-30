import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Box,
  Stack,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import L from "leaflet";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import { renderToStaticMarkup } from "react-dom/server";
import mapConfig from "../lib/mapConfig";
import { geocodeLocation } from "../lib/geocodeLocation";

// Smoothly fly to new coordinates
const MapUpdater = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 13);
    }
  }, [coords, map]);

  return null;
};

// Custom pushpin icon
const redPushPinIcon = L.divIcon({
  html: renderToStaticMarkup(
    <PersonPinCircleIcon style={{ color: "red", fontSize: "3rem" }} />
  ),
  className: "",
  iconAnchor: [16, 32],
});

// Main component
const MapView = ({ selectedProfile, label }) => {
  const mapRef = useRef();
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const defaultCoords = [20.5937, 78.9629]; // Default to center of India or similar

  // Smooth scroll into view when new location is shown
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [coords]);

  // Fetch coordinates when profile changes
  useEffect(() => {
    const fetchCoords = async () => {
      if (selectedProfile) {
        setLoading(true);
        try {
          const result = await geocodeLocation({
            country: selectedProfile.country,
            state: selectedProfile.state,
            city: selectedProfile.city,
          });
          setCoords(result);
        } catch (err) {
          console.error("Failed to geocode location:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoords();
  }, [selectedProfile]);

  return (
    <Stack
      ref={mapRef}
      sx={{
        position: "relative",
        filter: "brightness(100%)",
        "&:hover": { filter: "brightness(105%)" },
      }}
    >
      {/* Map Container (always renders fast) */}
      <MapContainer
        center={coords || defaultCoords}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          url={mapConfig.maptiler.url}
          attribution={mapConfig.maptiler.attribution}
        />
        {coords && <MapUpdater coords={coords} />}
        {coords && (
          <Marker position={coords} icon={redPushPinIcon}>
            <Popup>
              <Box sx={{ width: "90%" }}>{label}</Box>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Loader Overlay */}
      {loading && (
        <Backdrop
          open
          sx={{
            position: "absolute",
            zIndex: 1000,
            color: "#fff",
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Stack>
  );
};

export default MapView;
