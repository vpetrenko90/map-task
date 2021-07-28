import React, { useState } from 'react';
import { LeafletMouseEvent, LatLngLiteral } from 'leaflet';
import { useMapEvent } from 'react-leaflet';
import { Alert } from '@material-ui/lab';

import CircularProgress from '@material-ui/core/CircularProgress';

import '../style/Map.css';
import { getPrice } from '../api';
import { Buildings } from '../types';
import { MARKERS } from '../constants';
import MarkerItem from './Item';
import MarkerPredictPopup from './MarkerPredictPopup';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    alertContainer: {
      position: 'absolute',
      zIndex: 1000,
    },
  }),
);

function DynamicMarker({
  onSearch,
}: {
  onSearch?: (data: Buildings[]) => void;
}) {
  const classes = useStyles();
  const [price, setPrice] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [currentPosition, setCurrentPosition] = useState<LatLngLiteral>();
  const [positions, setPositions] = useState<LatLngLiteral[]>([]);

  useMapEvent('click', async ({ latlng }: LeafletMouseEvent) => {
    const { lat, lng } = latlng;

    if (currentPosition) {
      setPositions([...positions, currentPosition]);
    }

    if (latlng) {
      setIsLoading(true);
      setCurrentPosition(latlng);
      try {
        const { price, list } = await getPrice({ lat, lng });
        setPrice(price);
        if (onSearch) {
          onSearch(list);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <>
      {error && (
        <div className={classes.alertContainer}>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {positions?.map((item: LatLngLiteral) => (
        <MarkerItem
          key={`${item.lng}${item.lat}`}
          position={item}
          icon={MARKERS.violet}
        >
          ${price}
        </MarkerItem>
      ))}
      {currentPosition && (
        <MarkerItem position={currentPosition} icon={MARKERS.red} opened>
          {isLoading ? (
            <CircularProgress size={15} />
          ) : (
            price && <MarkerPredictPopup item={{ price }} />
          )}
        </MarkerItem>
      )}
    </>
  );
}

export default DynamicMarker;
