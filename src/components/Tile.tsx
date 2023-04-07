import * as React from 'react';
import { usePrevProps } from "../hooks/usePrevProps";
import { tileCount , containerWidth } from "../config";
import { Box } from "@mui/material";

interface TileProps {
  value: number;
  position: [number, number];
  zIndex: number;
}

export const Tile = (props: TileProps) => {
  const { value, position, zIndex } = props;
  const [scale, setScale] = React.useState(1);
  const previousValue = usePrevProps<number>(value);

  const isNew = previousValue === undefined;
  const hasChanged = previousValue !== value;
  const shallHighlight = isNew || hasChanged;

  React.useEffect(() => {
    if (shallHighlight) {
      setScale(1.1);
      setTimeout(() => setScale(1), 100);
    }
  }, [shallHighlight, scale]);

  const positionToPixels = (position: number) => {
    return (position / tileCount) * (containerWidth);
  }

  const style = {
    top: positionToPixels(position[1]),
    left: positionToPixels(position[0]),
    transform: `scale(${scale})`,
    zIndex,
  }

  return (
    <Box className="tile" style={style}>
      {value}
    </Box>
  );
}
