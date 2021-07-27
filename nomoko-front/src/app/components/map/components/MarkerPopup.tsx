import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Buildings } from '../types';

interface MarkerBuildingPopupProps {
  item: Buildings;
}

const useStyles = makeStyles(() =>
  createStyles({
    popup: {
      minWidth: 100,
    },
    popupTitle: {
      fontWeight: 600,
    },
  }),
);

function MarkerBuildingPopup({ item }: MarkerBuildingPopupProps) {
  const classes = useStyles();
  const { price, type, isParking } = item;

  return (
    <div className={classes.popup}>
      <div>
        <span className={classes.popupTitle}>Price:</span> ${price}
      </div>
      <div>
        <span className={classes.popupTitle}>Type:</span> {type}
      </div>
      <div>
        <span className={classes.popupTitle}>Parking:</span>{' '}
        {isParking ? 'Yes' : 'No'}
      </div>
    </div>
  );
}

export default MarkerBuildingPopup;
