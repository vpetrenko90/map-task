import React from 'react';
import cx from 'classnames';

import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { styles } from '../styles';

const useStyles = makeStyles(styles);

export interface Props {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode;
  fullPage?: boolean;
  background?: boolean;
  notUnmount?: boolean;
  inContent?: boolean;
  size?: number;
}

export function Loader({
  isLoading,
  children,
  fullPage = true,
  background = true,
  notUnmount = false,
  inContent = false,
  size = 50,
  className,
}: Props) {
  const classes = useStyles();

  return (
    <>
      {isLoading && (
        <div
          className={cx(classes.loaderWrapper, className, {
            [classes.loaderFullPageWrapper]: fullPage,
            [classes.loaderWrapperBackground]: background,
            [classes.loaderInContentWrapper]: inContent,
          })}
        >
          <CircularProgress className={classes.loader} size={size} />
        </div>
      )}
      {(notUnmount || !isLoading) && children}
    </>
  );
}
