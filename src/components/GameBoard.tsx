import * as React from 'react';
import { Card, Button, Typography } from "@mui/material";
import { Undo } from "@mui/icons-material";
import Grid from "./Grid";
import { GIRD_SIZE, GRID_WIDTH, GRID_HEIGHT } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../store/uiSlice";
import { selectNumArr } from "../store/uiSlice";

const GameBoard = () => {
  const dispatch = useDispatch();
  const numArr = useSelector(selectNumArr);

  React.useEffect(() => {
    const numArr: number[][] = [];
    for (let i = 0; i < GIRD_SIZE; i++) {
      numArr[i] = [];
      for (let j = 0; j < GIRD_SIZE; j++) {
        numArr[i][j] = -1;
      }
    }
    dispatch(uiSlice.actions.initNumArr(numArr));
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          dispatch(uiSlice.actions.moveUp());
          break;
        case 'ArrowDown':
          dispatch(uiSlice.actions.moveDown());
          break;
        case 'ArrowLeft':
          dispatch(uiSlice.actions.moveLeft());
          break;
        case 'ArrowRight':
          dispatch(uiSlice.actions.moveRight());
          break;
      }

      dispatch(uiSlice.actions.newNum());
      window.addEventListener('keydown', handleKeyDown, {once: true});
    }

    window.addEventListener('keydown', handleKeyDown, {once: true});
  }, []);

  const gridArr = numArr.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      return (
        <Grid
          key={`${rowIndex}-${colIndex}`}
          num={numArr[rowIndex][colIndex]}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      );
    })
  });

  return (
    <>
      <Button
        variant={'contained'}
        onClick={() => dispatch(uiSlice.actions.undo())}
      >
        <Undo />
        <Typography variant={'body2'} textTransform={'none'}>
          Undo
        </Typography>
      </Button>
      <Card
        id={'game-board'}
        sx={{
          width: GIRD_SIZE * GRID_WIDTH,
          height: GIRD_SIZE * GRID_HEIGHT,
        }}
      >
        {gridArr}
      </Card>
    </>
  );
}

export default GameBoard;
