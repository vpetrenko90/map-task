import React, { useEffect, useState } from 'react';

import MarkerItem from './Item';
import { getMarkers } from '../api';
import { Loader } from '../../ui/loader';
import { Buildings } from '../types';

function MarkersList() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Buildings[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const list: Buildings[] = await getMarkers();
      setData(list);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      {data?.map((item: any) => (
        <MarkerItem key={item.id} item={item} />
      ))}
    </>
  );
}

export default MarkersList;
