import { createStyles } from '@material-ui/core/styles';

import { colorPrimary, bgOverlay } from '../../../../../configs/variables';

export const styles = () =>
  createStyles({
    loaderWrapper: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      borderRadius: 'inherit',
    },
    loaderWrapperBackground: {
      backgroundColor: bgOverlay,
    },
    loaderFullPageWrapper: {
      position: 'fixed',
    },
    loaderInContentWrapper: {
      position: 'static',
      textAlign: 'center',
      padding: 16,

      '& $loader': {
        position: 'static',
        margin: 0,
      },
    },
    loader: {
      color: colorPrimary,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -25,
      marginLeft: -25,
      zIndex: 100,
    },
  });
