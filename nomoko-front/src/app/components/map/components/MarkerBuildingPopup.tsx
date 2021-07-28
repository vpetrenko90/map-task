import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Buildings } from '../types';
import { useTranslation } from 'react-i18next';

interface MarkerBuildingPopupProps {
  item: Buildings;
}

const useStyles = makeStyles(() =>
  createStyles({
    popup: {
      minWidth: 100,
    },
    popupProperty: {
      display: 'flex',
      gap: 5,
    },
    popupTitle: {
      fontWeight: 600,
    },
  }),
);

function MarkerBuildingPopup({ item }: MarkerBuildingPopupProps) {
  const classes = useStyles();
  const { price, type, isParking } = item;
  const { t } = useTranslation();

  return (
    <div className={classes.popup}>
      <div className={classes.popupProperty}>
        <span className={classes.popupTitle}>{t('map.markerPopup.price')}</span>
        <span>${price}</span>
      </div>
      <div className={classes.popupProperty}>
        <span className={classes.popupTitle}>{t('map.markerPopup.type')}</span>
        <span>{type}</span>
      </div>
      <div className={classes.popupProperty}>
        <span className={classes.popupTitle}>
          {t('map.markerPopup.parking')}
        </span>
        <span>{isParking ? t('map.fields.yes') : t('map.fields.no')}</span>
      </div>
    </div>
  );
}

export default MarkerBuildingPopup;
