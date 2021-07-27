import React from 'react';
import cx from 'classnames';

import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { styles } from '../styles';

const useStyles = makeStyles(styles);

export interface Props {
  isLoading: boolean;
  background?: boolean;
  size?: number;
}

export function Loader({ isLoading, background = true, size = 50 }: Props) {
  const classes = useStyles();

  return (
    <>
      {isLoading && (
        <div
          className={cx(classes.loaderWrapper, {
            [classes.loaderWrapperBackground]: background,
          })}
        >
          <CircularProgress className={classes.loader} size={size} />
        </div>
      )}
    </>
  );
}
