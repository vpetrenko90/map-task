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
import markerImage from '../assets/pin.svg';
import MarkersList from './List';

function DynamicMarker({ onSet = () => {} }: { onSet?: any }) {
  const [text, setText] = useState('');
  const [position, setPosition] = useState<any>(null);

  const getPrice = async (point: { lng: string; lat: string }) => {
    const { lng, lat } = point;
    const response = await fetch(
      `http://localhost:2222/geo/price?long=${lng}&lat=${lat}`,
    );
    const items = await response.json();
    return items;
  };

  const markerIcon = new L.Icon({
    iconUrl: markerImage,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const map = useMapEvent('click', async (e: any) => {
    onSet(e.latlng);
    const { lat, lng } = e.latlng;

    setPosition([lat, lng]);
    const result = await getPrice({ lat, lng });
    setText(`Estimated price = $${result?.price}`);
  });

  return (
    <>
      {position && (
        <Marker position={position} icon={markerIcon}>
          <Tooltip permanent>{text}</Tooltip>
        </Marker>
      )}
    </>
  );
}

export default DynamicMarker;
