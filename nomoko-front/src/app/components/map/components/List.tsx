import React, { useEffect, useState } from 'react';

import { Alert } from '@material-ui/lab';

import MarkerItem from './Item';
import { getMarkers } from '../api';
import { Loader } from '../../ui/loader';
import { Buildings } from '../types';
import MarkerBuildingPopup from './MarkerBuildingPopup';
import { MARKERS } from '../constants';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    alertContainer: {
      position: 'absolute',
      zIndex: 1000,
    },
  }),
);

function MarkersList({ nearbyList = [] }: { nearbyList: Buildings[] }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<Buildings[]>([]);

  useEffect(() => {
    (async () => {
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
      {error && (
        <div className={classes.alertContainer}>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
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
