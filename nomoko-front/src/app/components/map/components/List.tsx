import React, { useEffect, useState } from 'react';

import MarkerItem from './Item';
import { getMarkers } from '../api';
import { Loader } from '../../ui/loader';
import { Buildings } from '../types';
import MarkerBuildingPopup from './MarkerBuildingPopup';

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
      {data?.map((item: Buildings) => (
        <MarkerItem
          key={item.id}
          position={[
            item.location.coordinates[1],
            item.location.coordinates[0],
          ]}
        >
          <MarkerBuildingPopup item={item} />
        </MarkerItem>
      ))}
    </>
  );
}

export default MarkersList;
