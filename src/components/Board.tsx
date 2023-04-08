import * as React from 'react';
import { boardMargin, tileTotalWidth } from "../config";
import { Grid } from "./Grid";
import { Tile } from "./Tile";
import { TileMeta, selectTileCount } from "../store/uiSlice";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

interface BoardProps {
  tiles: TileMeta[];
}

export const Board = (props: BoardProps) => {
  const { tiles } = props;
  const tileCount = useSelector(selectTileCount);
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
