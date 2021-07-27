import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

export interface Props {
  position: LatLngExpression;
  children?: React.ReactNode;
}

function MarkerItem({ position, children }: Props) {
  return (
    <Marker position={position}>
      <Popup>{children}</Popup>
    </Marker>
  );
}

export default MarkerItem;
