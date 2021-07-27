import React from 'react';
import { Marker, Popup } from 'react-leaflet';

export interface Props {
  item: { location: { coordinates: number[] }; price: any };
  children?: React.ReactNode;
}

function MarkerItem({ item, children }: Props) {
  const { location, price } = item;

  return (
    <Marker position={[location.coordinates[1], location.coordinates[0]]}>
      {children || <Popup>${price}</Popup>}
    </Marker>
  );
}

export default MarkerItem;
