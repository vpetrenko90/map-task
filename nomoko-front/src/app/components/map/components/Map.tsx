import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import '../style/Map.css';
import MarkersList from './List';
import DynamicMarker from './DynamicMarker';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../constants';
import { Buildings } from '../types';

function MapComponent() {
  const [nearbyList, setNearbyList] = useState<Buildings[]>([]);

  return (
    <div className="App">
      <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <MarkersList nearbyList={nearbyList} />
        <DynamicMarker onSearch={setNearbyList} />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
