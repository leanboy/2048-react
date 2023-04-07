import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "./";

export interface TileMeta {
  id: number;
  position: [number, number];
  value: number;
}

export interface TileState {
  tiles: {
    [key: number]: TileMeta;
  };
  byIds: number[];
  hasChanged: boolean;
  inMotion: boolean;
}

export interface UiState {
  tileState: TileState
  history: TileState[];
}

const initialState: UiState = {
  tileState: {
    tiles: {},
    byIds: [],
    hasChanged: false,
    inMotion: false,
  },
  history: [],
}

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    createTile: (state: UiState, action: PayloadAction<TileMeta>) => {
      state.tileState.tiles[action.payload.id] = action.payload;
      state.tileState.byIds.push(action.payload.id);
      state.tileState.hasChanged = false;
      state.history.push(state.tileState);
    },
    updateTile: (state: UiState, action: PayloadAction<TileMeta>) => {
      state.tileState.tiles[action.payload.id] = action.payload;
      state.tileState.hasChanged = true;
    },
    mergeTile: (state: UiState, action: PayloadAction<{ source: TileMeta, destination: TileMeta }>) => {
      const { source, destination } = action.payload;
      const { [source.id]: sourceTile, [destination.id]: destinationTile, ...restTiles } = state.tileState.tiles;
      state.tileState.tiles = {
        ...restTiles,
        [destination.id]: {
          id: destination.id,
          value: source.value + destination.value,
          position: destination.position,
        },
      };
      state.tileState.byIds = state.tileState.byIds.filter(id => id !== source.id);
      state.tileState.hasChanged = true;
    },
    startMove: (state: UiState) => {
      state.tileState.inMotion = true;
    },
    endMove: (state: UiState) => {
      state.tileState.inMotion = false;
    },
    undo: (state: UiState) => {
      if (state.history.length > 2) {
        state.history.pop();
        state.tileState = state.history[state.history.length - 1];
      }
    }
  }
});

export const selectTiles = (state: rootState) => state.ui.tileState.tiles;
export const selectByIds = (state: rootState) => state.ui.tileState.byIds;
export const selectHasChanged = (state: rootState) => state.ui.tileState.hasChanged;
export const selectInMotion = (state: rootState) => state.ui.tileState.inMotion;
