import React from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import DraggableMarker from './map';

const position = [47.3810326, 8.5583433];

function App() {
  return (
    <div className="App">
      <MapContainer center={[47.3810326, 8.5583433]} zoom={13} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker />
      </MapContainer>
    </div>
  );
}

export default App;
