import { makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  gridSize: number;
  tileSize: number;
}

const getGridStyles = (gridSize: number) => ({
  display: 'grid',
  gridTemplateRows: `repeat(${gridSize}, ${100 / gridSize}%)`,
  gridTemplateColumns: `repeat(${gridSize}, ${100 / gridSize}%)`,
  transition: 'all .25s ease'
});

const getTileFontSize = (gridSize: number) => {
  if (gridSize === 3) return 70;
  else if (gridSize === 4) return 62;
  else if (gridSize === 5) return 56;
  else if (gridSize === 6) return 42;
  return 36;
};

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: theme.palette.secondary.main,
    transition: 'all .25s ease',
    borderRadius: 15,
    overflow: 'hidden'
  },
  grid: ({ gridSize, tileSize }: Props) => ({
    position: 'relative',
    width: gridSize * tileSize,
    height: gridSize * tileSize,
    ...getGridStyles(gridSize),
    '& p': {
      fontSize: getTileFontSize(gridSize)
    }
  }),
  paperOrdered: {
    opacity: 0.65,
    pointerEvents: 'none'
  },
  cell: {
    backgroundColor: theme.palette.secondary.light,
    width: ({ tileSize }: Props) => tileSize,
    height: ({ tileSize }: Props) => tileSize,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    border: `1px solid ${theme.palette.secondary.main}`,
    userSelect: 'none'
  },
  switchable: {
    cursor: 'pointer'
  },
  emptyTile: {
    visibility: 'hidden'
  }
}));
