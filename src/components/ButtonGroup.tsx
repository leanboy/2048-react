import * as React from 'react';
import {
  selectScore,
  selectTileCount,
  selectScoreAdded,
  selectInMotion,
  uiSlice
} from "../store/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, Typography } from "@mui/material";
import {boardMargin, tileTotalWidth} from "../config";

export const ButtonGroup = () => {
  const tileCount = useSelector(selectTileCount);
  const scoreAdded = useSelector(selectScoreAdded);
  const inMotion = useSelector(selectInMotion);

  const [isAnimating, setIsAnimating] = React.useState(false);
  const [initial, setInitial] = React.useState(true);

  const containerWidth = tileCount * tileTotalWidth;
  const boardWidth = containerWidth + boardMargin;

  const dispatch = useDispatch();
  const score = useSelector(selectScore);

  React.useEffect(() => {
    if (inMotion) {
      setIsAnimating(false);
    } else if (scoreAdded) {
      setIsAnimating(true);
    }
  }, [inMotion, scoreAdded]);

  React.useEffect(() => {
    if (initial) {
      setTimeout(() => setInitial(false), 1000);
    }
  }, []);

  const handleUndoClick = () => {
    dispatch(uiSlice.actions.undo());
  }

  const handleRestartClick = () => {
    dispatch(uiSlice.actions.reset());
  }

  return (
    <Stack direction="row" justifyContent={'space-between'} width={boardWidth}>
      <Button
        className="button"
        variant="contained"
        onClick={handleUndoClick}
        sx={{backgroundColor: "#8f7a66", color: "#f9f6f2", textTransform: 'none', "&:hover": {backgroundColor: "#776e65"}}}
      >
        <Typography variant={'h5'} fontWeight={'bold'}>
          Undo
        </Typography>
      </Button>
      <Stack alignItems={'center'} bgcolor={'#bbada0'} width={100} borderRadius={1} pt={1}>
        <Typography variant={'body2'} fontWeight={'bold'} color={'#faf8ef'}>
          SCORE
        </Typography>
        <Typography variant={'h4'} fontWeight={'bold'} color={'#fff'}>
          {score}
        </Typography>
        <Typography
          variant={'h5'} fontWeight={'bold'} color={'#776e65'}
          className={`score-addition${isAnimating ? '-animation' : ''}`}
        >
          {`+${initial ? score: scoreAdded}`}
        </Typography>
      </Stack>
      <Button
        className="button"
        variant="contained"
        onClick={handleRestartClick}
        sx={{backgroundColor: "#8f7a66", color: "#f9f6f2", textTransform: 'none', "&:hover": {backgroundColor: "#776e65"}}}
      >
        <Typography variant={'h5'} fontWeight={'bold'}>
          Restart
        </Typography>
      </Button>
    </Stack>
  );
}
