import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "./";

export interface TileMeta {
  id: number;
  position: [number, number];
  value: number;
}

export interface UiState {
  tiles: {
    [key: number]: TileMeta;
  };
  byIds: number[];
  hasChanged: boolean;
  inMotion: boolean;
}

const initialState: UiState = {
  tiles: {},
  byIds: [],
  hasChanged: false,
  inMotion: false,
}

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    createTile: (state: UiState, action: PayloadAction<TileMeta>) => {
      state.tiles[action.payload.id] = action.payload;
      state.byIds.push(action.payload.id);
      state.hasChanged = false;
    },
    updateTile: (state: UiState, action: PayloadAction<TileMeta>) => {
      state.tiles[action.payload.id] = action.payload;
      state.hasChanged = true;
    },
    mergeTile: (state: UiState, action: PayloadAction<{ source: TileMeta, destination: TileMeta }>) => {
      const { source, destination } = action.payload;
      const { [source.id]: sourceTile, [destination.id]: destinationTile, ...restTiles } = state.tiles;
      state.tiles = {
        ...restTiles,
        [destination.id]: {
          id: destination.id,
          value: source.value + destination.value,
          position: destination.position,
        },
      };
      state.byIds = state.byIds.filter(id => id !== source.id);
      state.hasChanged = true;
    },
    startMove: (state: UiState) => {
      state.inMotion = true;
    },
    endMove: (state: UiState) => {
      state.inMotion = false;
    }
  }
});

export const selectTiles = (state: rootState) => state.ui.tiles;
export const selectByIds = (state: rootState) => state.ui.byIds;
export const selectHasChanged = (state: rootState) => state.ui.hasChanged;
export const selectInMotion = (state: rootState) => state.ui.inMotion;
