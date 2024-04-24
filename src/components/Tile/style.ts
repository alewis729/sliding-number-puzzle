import { Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  tile: {
    position: 'relative',
    '& > p': {
      zIndex: 1,
      fontWeight: theme.typography.fontWeightBold,
      color: '#111',
      textShadow: '#222 1px 1px 1px'
    }
  },
  image: {
    display: 'block',
    position: 'absolute',
    pointerEvents: 'none',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 0
  }
}));
