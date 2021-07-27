import React from 'react';
import MarkerItem from './Item';
import { useFetchMarkers } from '../api';

function MarkersList() {
  const { data, isLoading, error } = useFetchMarkers();

  return (
    <>
      {data?.map((item: any) => (
        <MarkerItem key={item.id} item={item} />
      ))}
    </>
  );
}

export default MarkersList;
