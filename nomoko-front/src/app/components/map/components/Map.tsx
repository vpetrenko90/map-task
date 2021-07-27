import React, { useState } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  Tooltip,
} from 'react-leaflet';

import '../style/Map.css';
import MarkersList from './List';
import DynamicMarker from './DynamicMarker';

function MapComponent() {
  return (
    <div className="App">
      <MapContainer
        center={[47.3810326, 8.5583433]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <MarkersList />
        <DynamicMarker />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
