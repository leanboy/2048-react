import * as React from 'react';
import { tileCount } from "../config";
import { Box } from "@mui/material";

export const Grid = () => {

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
