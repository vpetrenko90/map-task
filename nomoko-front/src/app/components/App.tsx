import React, { useState } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from 'react-leaflet';

import './App.css';
import markerImage from './pin.svg';

const position = [47.3810326, 8.5583433];

const markers = [
  [47.3375577, 8.5266948],
  [47.3540935, 8.5553344],
  [47.3550125, 8.603635],
  [47.3550125, 8.603635],
  [47.3550125, 8.603635],
  [47.3550125, 8.603635],
  [47.3576212, 8.5729142],
  [47.3607583, 8.5521945],
  [47.3633783, 8.5597119],
  [47.3646544, 8.5105568],
  [47.3676673, 8.5309105],
];

function MyComponent({ onSet }: { onSet: any }) {
  const map = useMapEvent('click', e => {
    onSet(e.latlng);
  });
  return null;
}

function App() {
  const [text, setText] = useState('');
  const [position, setPosition] = useState<any>(null);

  const onSetHandle = async (e: any) => {
    const { lat, lng } = e;
    setPosition([lat, lng]);
    console.log('ADD MARKER', e);
    //@ts-ignore
    const result = await getPrice({ lat, lng });
    setText(`Estimated price = ${result?.price}`);
  };

  const markerIcon = new L.Icon({
    iconUrl: markerImage,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const getPrice = async (point: { lng: string; lat: string }) => {
    const { lng, lat } = point;
    const response = await fetch(
      `http://localhost:2222/geo/price?long=${lng}&lat=${lat}`,
    );
    const items = await response.json();
    return items;
  };

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
        <MyComponent onSet={onSetHandle} />
        {position && (
          <Marker position={position} icon={markerIcon}>
            <Popup>{text}</Popup>
          </Marker>
        )}
        {markers.length > 0 &&
          markers.map(([long, lat]) => (
            <Marker position={[long, lat]}>
              <Popup>
                {long} / {lat}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default App;
