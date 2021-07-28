import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import '../../../locales/i18n';
import { MapComponent } from '../map';
import { MARKERS_HINTS } from '../map/constants';

const useStyles = makeStyles(theme => ({
  h1: {
    fontSize: 28,
    fontWeight: 500,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    padding: theme.spacing(2),
  },
  markerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    gap: 5,
  },
  markers: {
    width: 'auto',
    height: 30,
  },
}));

function App() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h3">{t('map.title')}</Typography>
            <Typography variant="h4">{t('map.subtitle')}</Typography>

            {MARKERS_HINTS.map(({ type, src }) => (
              <div className={classes.markerContainer} key={type}>
                <img
                  className={classes.markers}
                  src={src}
                  alt={t(`map.hints.${type}.alt`)}
                />
                <span>{t(`map.hints.${type}.text`)}</span>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            <MapComponent />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
