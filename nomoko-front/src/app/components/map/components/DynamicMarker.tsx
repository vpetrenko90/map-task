import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Marker, useMapEvent, Tooltip, Popup } from 'react-leaflet';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

import '../style/Map.css';
import { getPrice } from '../api';

import markerRedIcon from '../assets/marker-icon-2x-red.png';
import markerVioletIcon from '../assets/marker-icon-2x-violet.png';
import markerShadow from '../assets/marker-shadow.png';
import MarkerItem from './Item';

const markerRed = new L.Icon({
  iconUrl: markerRedIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const markerViolet = new L.Icon({
  iconUrl: markerVioletIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function DynamicMarker() {
  const [price, setPrice] = useState('');
  const [list, setList] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<any>(null);
  const [positions, setPositions] = useState<any>([]);

  useMapEvent('click', async (e: any) => {
    const { lat, lng } = e.latlng;

    if (position) {
      setPositions([...positions, position]);
    }

    if (e.latlng) {
      setIsLoading(true);
      setPosition([lat, lng]);
      const { price, list } = await getPrice({ lat, lng });
      setPrice(price);
      setList(list);
      setIsLoading(false);
    }
  });

  return (
    <>
      {positions?.map((item: any, i: number) => (
        <Marker key={i} position={item} icon={markerViolet}>
          <Popup>${price}</Popup>
        </Marker>
      ))}
      {position && (
        <Marker position={position} icon={markerRed}>
          <Tooltip permanent>
            {isLoading ? (
              <CircularProgress size={15} />
            ) : (
              <Typography>${price}</Typography>
            )}
          </Tooltip>
        </Marker>
      )}
    </>
  );
}

export default DynamicMarker;
