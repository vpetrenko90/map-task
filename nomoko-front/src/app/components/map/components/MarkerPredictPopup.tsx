import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface MarkerBuildingPopupProps {
  item: { price: number };
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

function MarkerPredictPopup({ item }: MarkerBuildingPopupProps) {
  const classes = useStyles();
  const { price } = item;

  return (
    <div className={classes.popup}>
      <div>
        <span className={classes.popupTitle}>Expected price:</span> ${price}
      </div>
    </div>
  );
}

export default MarkerPredictPopup;
