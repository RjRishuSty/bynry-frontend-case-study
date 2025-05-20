import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import mapConfig from '../lib/mapConfig';
import 'leaflet/dist/leaflet.css';
import { Container } from '@mui/material';
import L from 'leaflet';
import PushPinIcon from '@mui/icons-material/PushPin';
import { renderToStaticMarkup } from 'react-dom/server';

const MapUpdater = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 13);
    }
  }, [location, map]);

  return null;
};

// Custom icon ............
const redPushPinIcon = L.divIcon({
  html: renderToStaticMarkup(
    <PushPinIcon style={{ color: 'red', fontSize: '32px' }} />
  ),
  className: '',
  iconAnchor: [16, 32],
});

const MapView = ({ location, label }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  if (!location) return null;

  return (
    <Container ref={mapRef}>
      <MapContainer
        center={location}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '100%', marginTop: '20px' }}
      >
        <MapUpdater location={location} />
        <TileLayer
          url={mapConfig.maptiler.url}
          attribution={mapConfig.maptiler.attribution}
        />
        <Marker position={location} icon={redPushPinIcon}>
          <Popup>{label}</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default MapView;
