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
  tileState: TileState;
  history: TileState[];
  initial: boolean;
}

const initialTileState: TileState = {
  tiles: {},
  byIds: [],
  hasChanged: false,
  inMotion: false,
}

const initialState: UiState = {
  tileState: initialTileState,
  history: [],
  initial: true,
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
    },
    startMove: (state: UiState) => {
      state.tileState.inMotion = true;
    },
    endMove: (state: UiState) => {
      state.tileState.inMotion = false;
    },
    undo: (state: UiState) => {
      if (state.history.length > 1) {
        state.history.pop();
        state.tileState = state.history[state.history.length - 1];
      }
    },
    changeInitial: (state: UiState, action: PayloadAction<boolean>) => {
      state.initial = action.payload;
    },
    reset: (state: UiState) => {
      state.tileState = initialTileState;
      state.history = [];
      state.initial = true;
    }
  }
});

export const selectTiles = (state: rootState) => state.ui.tileState.tiles;
export const selectByIds = (state: rootState) => state.ui.tileState.byIds;
export const selectHasChanged = (state: rootState) => state.ui.tileState.hasChanged;
export const selectInMotion = (state: rootState) => state.ui.tileState.inMotion;
export const selectInitial = (state: rootState) => state.ui.initial;
