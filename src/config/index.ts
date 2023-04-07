const pixelSize = 8

export const animationDuration = 500;

export const tileCount = 4;

export const boardMargin = 2 * pixelSize;

const tileWidthMultiplier = 12.5;
const tileWidth = tileWidthMultiplier * pixelSize;
const tileMargin = 2 * pixelSize;

export const tileTotalWidth = tileWidth + tileMargin;

export const containerWidth = tileTotalWidth * tileCount;
