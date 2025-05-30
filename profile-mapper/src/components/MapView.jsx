import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Container, Stack } from "@mui/material";
import L from "leaflet";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import { renderToStaticMarkup } from "react-dom/server";
import mapConfig from "../lib/mapConfig";
import { geocodeLocation } from "../lib/geocodeLocation";

// Helper component to smoothly fly to new coordinates
const MapUpdater = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 13);
    }
  }, [coords, map]);

  return null;
};

// Custom pin icon
const redPushPinIcon = L.divIcon({
  html: renderToStaticMarkup(
    <PersonPinCircleIcon style={{ color: "red", fontSize: "3rem" }} />
  ),
  className: "",
  iconAnchor: [16, 32],
});

// Main MapView component
const MapView = ({ selectedProfile, label }) => {
  const mapRef = useRef();
  const [coords, setCoords] = useState(null);

  // Smooth scroll to map view when coordinates update
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [coords]);

  // Geocode location to get lat/lng coordinates
  useEffect(() => {
    const fetchCoords = async () => {
      if (selectedProfile) {
        try {
          const result = await geocodeLocation({
            country: selectedProfile.country,
            state: selectedProfile.state,
            city: selectedProfile.city,
          });
          setCoords(result);
        } catch (err) {
          console.error("Failed to geocode location:", err);
        }
      }
    };

    fetchCoords();
  }, [selectedProfile]);

  if (!coords) return null;

  return (
    <Stack
      ref={mapRef}
      sx={{
        filter: "brightness(100%)",
        "&:hover": { filter: "brightness(105%)" },
      }}
    >
      <MapContainer
        center={coords}
        zoom={10}
        scrollWheelZoom={false}
        style={{
          height: "90vh",
          width: "100%",
        }}
      >
        <MapUpdater coords={coords} />
        <TileLayer
          url={mapConfig.maptiler.url}
          attribution={mapConfig.maptiler.attribution}
        />
        <Marker position={coords} icon={redPushPinIcon}>
          <Popup>
            <Box
              sx={{
                border: "2px solid black",
                boxShadow: 3,
                width: "90%",
              }}
            >
              {label}
            </Box>
          </Popup>
        </Marker>
      </MapContainer>
    </Stack>
  );
};

export default MapView;
