import * as React from 'react';
import { boardMargin, tileCount, tileTotalWidth } from "../config";
import { Grid } from "./Grid";
import { Tile } from "./Tile";
import { TileMeta } from "../store/uiSlice";
import { Box } from "@mui/material";

interface BoardProps {
  tiles: TileMeta[];
}

export const Board = (props: BoardProps) => {
  const { tiles } = props;
  const containerWidth = tileCount * tileTotalWidth;
  const boardWidth = containerWidth + boardMargin;

  const tileList = tiles.map(({ id, ...restProps }) => (
    <Tile key={`tile-${id}`} {...restProps} zIndex={id} />
  ));

  return (
    <Box className="board" width={boardWidth}>
      <Box className="tile-container">{tileList}</Box>
      <Grid />
    </Box>
  );
}
