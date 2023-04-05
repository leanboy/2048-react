import * as React from 'react';
import { Card, Typography } from "@mui/material";
import { GRID_WIDTH, GRID_HEIGHT } from "../config";

interface GridProps {
  rowIndex: number;
  colIndex: number;
  num: number;
}

const Grid = (props: GridProps) => {
  const { rowIndex, colIndex, num } = props;

  return (
    <Card
      variant={"outlined"}
      className={'grid'}
      id={`grid-${rowIndex}-${colIndex}`}
      sx={{
        width: GRID_WIDTH,
        height: GRID_HEIGHT,
        position: "absolute",
        top: rowIndex * GRID_WIDTH,
        left: colIndex * GRID_HEIGHT,
        backgroundColor: '#ddd',
      }}
    >
      <Typography fontSize={60}>
        {num === -1 ? '' : num}
      </Typography>
    </Card>
  );
}

export default Grid;
