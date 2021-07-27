import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Marker, useMapEvent, Tooltip } from 'react-leaflet';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

import '../style/Map.css';
import { getPrice } from '../api';

import marker from '../assets/marker-icon-2x-red.png';
import markerShadow from '../assets/marker-shadow.png';

function DynamicMarker({ onSet = () => {} }: { onSet?: any }) {
  const [price, setPrice] = useState('');
  const [list, setList] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<any>(null);

  const markerIcon = new L.Icon({
    iconUrl: marker,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const map = useMapEvent('click', async (e: any) => {
    onSet(e.latlng);
    const { lat, lng } = e.latlng;

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
      {position && (
        <Marker position={position} icon={markerIcon}>
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
