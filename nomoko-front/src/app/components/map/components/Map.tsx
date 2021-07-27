import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import '../style/Map.css';
import MarkersList from './List';
import DynamicMarker from './DynamicMarker';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../constants';

function MapComponent() {
  return (
    <div className="App">
      <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} scrollWheelZoom>
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
