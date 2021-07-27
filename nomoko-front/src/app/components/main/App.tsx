import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Radio,
} from '@material-ui/core';
import { MapComponent } from '../map';

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
  map: {
    maxWidth: '50vw',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h3">Nomoko Demo</Typography>
            <Typography variant="h4">
              Find approximate building price
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.map}>
            <MapComponent />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
