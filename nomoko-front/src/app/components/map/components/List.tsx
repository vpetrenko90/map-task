import React from 'react';

import MarkerItem from './Item';
import { useFetchMarkers } from '../api';
import { Loader } from '../../ui/loader';

function MarkersList() {
  const { data, isLoading } = useFetchMarkers();

  return (
    <>
      <Loader isLoading={isLoading || true} />
      {data?.map((item: any) => (
        <MarkerItem key={item.id} item={item} />
      ))}
    </>
  );
}

export default MarkersList;
