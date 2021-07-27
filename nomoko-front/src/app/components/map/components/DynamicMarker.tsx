import React, { useState } from 'react';
import { LeafletMouseEvent, LatLngLiteral } from 'leaflet';
import { Marker, useMapEvent, Tooltip, Popup } from 'react-leaflet';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

import '../style/Map.css';
import { getPrice } from '../api';
import { Buildings } from '../types';
import { MARKERS } from '../constants';
import MarkerItem from './Item';

function DynamicMarker() {
  const [price, setPrice] = useState<number>();
  const [nearbyList, setNearbyList] = useState<Buildings[]>();
  const [isLoading, setIsLoading] = useState(false);

  const [currentPosition, setCurrentPosition] = useState<LatLngLiteral>();
  const [positions, setPositions] = useState<LatLngLiteral[]>([]);

  useMapEvent('click', async ({ latlng }: LeafletMouseEvent) => {
    const { lat, lng } = latlng;

    if (currentPosition) {
      setPositions([...positions, currentPosition]);
    }

    if (latlng) {
      setIsLoading(true);
      setCurrentPosition(latlng);
      const { price, list } = await getPrice({ lat, lng });
      setPrice(price);
      setNearbyList(list);
      setIsLoading(false);
    }
  });

  return (
    <>
      {positions?.map((item: LatLngLiteral) => (
        <Marker
          key={`${item.lng}${item.lat}`}
          position={item}
          icon={MARKERS.violet}
        >
          <Popup>${price}</Popup>
        </Marker>
      ))}
      {currentPosition && (
        <Marker position={currentPosition} icon={MARKERS.red}>
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
