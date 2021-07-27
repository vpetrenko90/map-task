import React, { useRef } from 'react';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';

export interface Props {
  position: LatLngExpression;
  children?: React.ReactNode;
  icon?: Icon;
  opened?: boolean;
}

function MarkerItem({ position, children, opened = false, ...props }: Props) {
  const markerRef = useRef(null);

  return (
    <Marker position={position} ref={markerRef} {...props}>
      {opened ? (
        <Tooltip permanent>{children}</Tooltip>
      ) : (
        <Popup>{children}</Popup>
      )}
    </Marker>
  );
}

export default MarkerItem;
