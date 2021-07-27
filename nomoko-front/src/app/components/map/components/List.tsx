import React, { useEffect, useState } from 'react';
import MarkerItem from './Item';

function MarkersList() {
  const [markers, setMarkers] = useState<any>([]);

  const getMarkers = async () => {
    const response = await fetch(`http://localhost:2222/geo`);
    const items = await response.json();
    setMarkers(items);
  };

  useEffect(() => {
    getMarkers();
  }, []);

  return (
    <>
      {markers.map((item: any) => (
        <MarkerItem item={item} />
      ))}
    </>
  );
}

export default MarkersList;
