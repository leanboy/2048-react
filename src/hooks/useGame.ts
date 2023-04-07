import * as React from 'react';
import { animationDuration, tileCount } from "../config";
import { uiSlice, TileMeta } from "../store/uiSlice";
import { useIds } from "./useIds";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTiles,
  selectByIds,
  selectHasChanged,
  selectInMotion
} from "../store/uiSlice";
import {useEffect} from "react";

export const useGame = () => {
  const isInitalRender = React.useRef(true);
  const [nextId] = useIds();
  const dispatch = useDispatch();

  const tiles = useSelector(selectTiles);
  const byIds = useSelector(selectByIds);
  const hasChanged = useSelector(selectHasChanged);
  const inMotion = useSelector(selectInMotion);

  const createTile = React.useCallback(
    (position: [number, number], value: number) => {
      dispatch(uiSlice.actions.createTile({ id: nextId(), position, value }));
    }, [nextId]);

  const throttledMergeTile = (source: TileMeta, destination: TileMeta) => {
    setTimeout(() => {
      dispatch(uiSlice.actions.mergeTile({ source, destination }));
    }, animationDuration);
  }

  const updateTile = (tile: TileMeta) => {
    dispatch(uiSlice.actions.updateTile(tile));
  }

  const didTileMove = (source: TileMeta, destination: TileMeta) => {
    return source.position[0] !== destination.position[0] ||
      source.position[1] !== destination.position[1];
  }

  const retrieveTileMap = React.useCallback(() => {
    const tileMap = new Array(tileCount * tileCount).fill(0);

    byIds.forEach(id => {
      const { position } = tiles[id];
      const index = positionToIndex(position);
      tileMap[index] = id;
    });

    return tileMap;
  }, [byIds, tiles]);

  const findEmptyTile = React.useCallback(() => {
    const tileMap = retrieveTileMap();

    return tileMap.reduce((result, tileId, index) => {
      if (tileId === 0) {
        return [...result, indexToPosition(index)];
      }

      return result;
    }, [] as [number, number][]);
  }, [retrieveTileMap]);

  const generateRandomTile = React.useCallback(() => {
    const emptyTiles = findEmptyTile();

    if (emptyTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyTiles.length);
      const randomPosition = emptyTiles[randomIndex];
      const value = Math.random() > 0.5 ? 2 : 4;

      createTile(randomPosition, value);
    }
  }, [findEmptyTile, createTile]);

  const positionToIndex = (position: [number, number]) => {
    return position[1] * tileCount + position[0];
  }

  const indexToPosition = (index: number): [number, number] => {
    return [index % tileCount, Math.floor(index / tileCount)];
  }

  type RetrieveTileIdsPerRowOrColumn = (rowOrColumnIndex: number) => number[];

  type CalculateTileIndex = (
    tileIndex: number,
    tileInRowIndex: number,
    howManyMerges: number,
    maxIndexInRow: number
  ) => number;

  const move = (
    retrieveTileIdsPerRowOrColumn: RetrieveTileIdsPerRowOrColumn,
    calculateFirstFreeIndex: CalculateTileIndex
  ) => {
    dispatch(uiSlice.actions.startMove());

    for (let index = 0; index < tileCount; index++) {
      const availableTileIds = retrieveTileIdsPerRowOrColumn(index);

      let prevTile: TileMeta | null = null;
      let mergeCount = 0;

      availableTileIds.forEach((tileId, nonEmptyTileIndex) => {
        const curTile = tiles[tileId];

        if (prevTile && prevTile.value === curTile.value) {
          const tile: TileMeta = {
            ...curTile,
            position: prevTile.position,
          };

          throttledMergeTile(tile, prevTile);
          prevTile = null;
          mergeCount++;

          updateTile(tile);
        }

        const tile: TileMeta = {
          ...curTile,
          position: indexToPosition(
            calculateFirstFreeIndex(
              index,
              nonEmptyTileIndex,
              mergeCount,
              tileCount - 1
            )
          ),
        }

        prevTile = tile;

        if (didTileMove(curTile, tile)) {
          updateTile(tile);
        }
      });
    }

    setTimeout(() => {
      dispatch(uiSlice.actions.endMove());
    }, animationDuration);
  };

  const moveLeft = () => {
    const retrieveTileIdsByRow = (rowIndex: number) => {
      const tileMap = retrieveTileMap();

      const tileIdsInRow = [];
      for (let i = 0; i < tileCount; i++) {
        const tileId = tileMap[rowIndex * tileCount + i];
        if (tileId) {
          tileIdsInRow.push(tileId);
        }
      }
      return tileIdsInRow;
    }

    const calculateFirstFreeIndex = (
      tileIndex: number,
      tileInRowIndex: number,
      howManyMerges: number,
      _: number
    ) => {
      return (
        tileIndex * tileCount + tileInRowIndex - howManyMerges
      );
    };

    move(retrieveTileIdsByRow, calculateFirstFreeIndex);
  };

  const moveRight = () => {
    const retrieveTileIdsByRow = (rowIndex: number) => {
      const tileMap = retrieveTileMap();

      const tileIdsInRow = [];
      for (let i = tileCount - 1; i >= 0; i--) {
        const tileId = tileMap[rowIndex * tileCount + i];
        if (tileId) {
          tileIdsInRow.push(tileId);
        }
      }
      return tileIdsInRow;
    }

    const calculateFirstFreeIndex = (
      tileIndex: number,
      tileInRowIndex: number,
      howManyMerges: number,
      maxIndexInRow: number
    ) => {
      return (
        tileIndex * tileCount + maxIndexInRow - tileInRowIndex + howManyMerges
      );
    };

    move(retrieveTileIdsByRow, calculateFirstFreeIndex);
  }

  const moveUp = () => {
    const retrieveTileIdsByColumn = (columnIndex: number) => {
      const tileMap = retrieveTileMap();

      const tileIdsInColumn = [];
      for (let i = 0; i < tileCount; i++) {
        const tileId = tileMap[i * tileCount + columnIndex];
        if (tileId) {
          tileIdsInColumn.push(tileId);
        }
      }
      return tileIdsInColumn;
    }

    const calculateFirstFreeIndex = (
      tileIndex: number,
      tileInColumnIndex: number,
      howManyMerges: number,
      _: number
    ) => {
      return (
        tileIndex + tileCount * (tileInColumnIndex - howManyMerges)
      );
    };

    move(retrieveTileIdsByColumn, calculateFirstFreeIndex);
  }

  const moveDown = () => {
    const retrieveTileIdsByColumn = (columnIndex: number) => {
      const tileMap = retrieveTileMap();

      const tileIdsInColumn = [];
      for (let i = tileCount - 1; i >= 0; i--) {
        const tileId = tileMap[i * tileCount + columnIndex];
        if (tileId) {
          tileIdsInColumn.push(tileId);
        }
      }
      return tileIdsInColumn;
    }

    const calculateFirstFreeIndex = (
      tileIndex: number,
      tileInColumnIndex: number,
      howManyMerges: number,
      maxIndexInColumn: number
    ) => {
      return (
        tileIndex + tileCount * (maxIndexInColumn - tileInColumnIndex + howManyMerges)
      );
    };

    move(retrieveTileIdsByColumn, calculateFirstFreeIndex);
  }

  useEffect(() => {
    if (isInitalRender.current) {
      createTile([0, 1], 2);
      createTile([0, 2], 2);
      isInitalRender.current = false;
      return;
    }

    if (!inMotion && hasChanged) {
      generateRandomTile();
    }
  }, [inMotion, hasChanged, createTile, generateRandomTile]);

  const tileList = byIds.map(tileId => tiles[tileId]);

  return [tileList, moveLeft, moveRight, moveUp, moveDown] as [
    TileMeta[],
    () => void,
    () => void,
    () => void,
    () => void
  ];
}
