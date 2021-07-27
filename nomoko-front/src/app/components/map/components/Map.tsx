import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  Tooltip,
} from 'react-leaflet';

import '../style/Map.css';
import markerImage from './pin.svg';
import MarkersList from './List';

function MyComponent({ onSet }: { onSet: any }) {
  const map = useMapEvent('click', e => {
    onSet(e.latlng);
  });
  return null;
}

function MapComponent() {
  const [text, setText] = useState('');
  const [position, setPosition] = useState<any>(null);
  const [markers, setMarkers] = useState<any>([]);

  const onSetHandle = async (e: any) => {
    const { lat, lng } = e;
    setPosition([lat, lng]);
    console.log('ADD MARKER', e);
    //@ts-ignore
    const result = await getPrice({ lat, lng });
    setText(`Estimated price = $${result?.price}`);
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
            <Tooltip permanent>{text}</Tooltip>
          </Marker>
        )}
        <MarkersList />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
