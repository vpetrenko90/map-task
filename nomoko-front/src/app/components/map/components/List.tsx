import React, { useEffect, useState } from 'react';

import MarkerItem from './Item';
import { getMarkers } from '../api';
import { Loader } from '../../ui/loader';
import { Alert } from '../../ui/alert';
import { Buildings } from '../types';
import MarkerBuildingPopup from './MarkerBuildingPopup';
import { MARKERS } from '../constants';

function MarkersList({ nearbyList = [] }: { nearbyList: Buildings[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [data, setData] = useState<Buildings[]>([]);

  useEffect(() => {
    (async () => {
      setError(null);
      setIsLoading(true);
      try {
        const list: Buildings[] = await getMarkers();
        setData(list);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {error && <Alert error={error} />}
      <Loader isLoading={isLoading} />
      {data?.map((item: Buildings) => {
        const isNearBy = nearbyList.find(({ id }) => id === item.id);
        return (
          <MarkerItem
            key={item.id}
            position={[
              item.location.coordinates[1],
              item.location.coordinates[0],
            ]}
            icon={isNearBy ? MARKERS.gold : MARKERS.blue}
          >
            <MarkerBuildingPopup item={item} />
          </MarkerItem>
        );
      })}
    </>
  );
}

export default MarkersList;
