import * as React from 'react';
import { tileCount } from "../config";

export const Grid = () => {

  const renderGrid = () => {
    const length = tileCount * tileCount;
    const cells = [];

    for (let index = 0; index < length; index += 1) {
      cells.push(<div key={`${index}`} className={`grid-cell`} />);
    }

    return cells;
  };

  return <div className="grid">{renderGrid()}</div>;
}
