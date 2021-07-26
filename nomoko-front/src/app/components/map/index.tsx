import React, { useState, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const center = {
  lat: 47.3810326,
  lng: 8.5583433,
};

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          //@ts-ignore
          setPosition(marker.getLatLng());
          //@ts-ignore
          const point = marker.getLatLng();
          console.log('lang/lat', point);
          await getPrice(point);
        }
      },
    }),
    [],
  );

  const getPrice = async (point: { lng: string; lat: string }) => {
    const { lng, lat } = point;
    const response = await fetch(
      `http://localhost:2222/geo/price?long=${lng}&lat=${lat}`,
    );
    const items = await response.json();
    console.log(items);
  };

  const toggleDraggable = useCallback(() => {
    setDraggable(d => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
}

export default DraggableMarker;
