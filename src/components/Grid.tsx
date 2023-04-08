import * as React from 'react';
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTileCount } from "../store/uiSlice";

export const Grid = () => {
  const tileCount = useSelector(selectTileCount);

  const renderGrid = () => {
    const length = tileCount * tileCount;
    const cells = [];

    for (let index = 0; index < length; index += 1) {
      cells.push(<Box key={`${index}`} className={`grid-cell`} />);
    }

    return cells;
  };

  return <Box className="grid">{renderGrid()}</Box>;
}
