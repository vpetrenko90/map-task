import React from 'react';

import { Alert } from '@material-ui/lab';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { styles } from '../styles';

const useStyles = makeStyles(styles);

export interface Props {
  error?: string;
}

export function AlertComponent({ error }: Props) {
  const classes = useStyles();

  return (
    <>
      {error && (
        <div className={classes.alertContainer}>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
    </>
  );
}
