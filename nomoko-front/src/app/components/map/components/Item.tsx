import React from 'react';
import { Marker, Popup } from 'react-leaflet';

function MarkerItem({ item }: any) {
  const { location, price } = item;

  return (
    <Marker position={[location.coordinates[1], location.coordinates[0]]}>
      <Popup>${price}</Popup>
    </Marker>
  );
}

export default MarkerItem;
