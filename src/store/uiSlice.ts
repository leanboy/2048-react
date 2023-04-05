import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "./";
import { GIRD_SIZE } from "../config";

export interface UiState {
  numArr: number[][];
  history: number[][][];
}


const initialState: UiState = {
  numArr: [],
  history: []
}

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    initNumArr: (state: UiState, action: PayloadAction<number[][]>) => {
      state.numArr = action.payload;
      state.history.push(action.payload);
    },
    newNum: (state: UiState) => {
      // find empty grid == -1
      const emptyGrids: number[][] = [];
      for (let i = 0; i < GIRD_SIZE; i++) {
        for (let j = 0; j < GIRD_SIZE; j++) {
          if (state.numArr[i][j] === -1) {
            emptyGrids.push([i, j]);
          }
        }
      }
      // random select one
      const randomIndex = Math.floor(Math.random() * emptyGrids.length);
      const randomGrid = emptyGrids[randomIndex];
      console.log(randomGrid);
      // set value
      state.numArr[randomGrid[0]][randomGrid[1]] = Math.random() > 0.5 ? 2 : 4;
      state.history.push(state.numArr);
    },
    undo: (state: UiState) => {
      if (state.history.length > 1) {
        state.history.pop();
        state.numArr = state.history[state.history.length - 1];
      }
    },
    moveUp: (state: UiState) => {
      for (let j = 0; j < GIRD_SIZE; j++) {
        let lastMergedIndex = -1;  // uppest merged grid
        for (let i = 1; i < GIRD_SIZE; i++) {
          // uppest unempty grid
          if (state.numArr[i][j] === -1) continue;

          let merge = false;
          let move = false;
          for (let k = lastMergedIndex + 1; k < i; k++) {
            if (state.numArr[k][j] === -1) {
              // uppest empty grid
              state.numArr[k][j] = state.numArr[i][j];
              state.numArr[i][j] = -1;
              move = true;
              break;
            }
            if (!merge && state.numArr[k][j] === state.numArr[i][j]) {
              // merge grid
              state.numArr[k][j] += state.numArr[i][j];
              state.numArr[i][j] = -1;
              lastMergedIndex = k;
              merge = true;
            }
          }
          if (!merge && !move) {
            lastMergedIndex = i - 1;
          }
        }
      }
    },
    moveDown: (state: UiState) => {
      for (let j = 0; j < GIRD_SIZE; j++) {
        let lastMergedIndex = GIRD_SIZE;  // downest merged grid
        for (let i = GIRD_SIZE - 2; i >= 0; i--) {
          // downest unempty grid
          if (state.numArr[i][j] === -1) continue;

          let merge = false;
          let move = false;
          for (let k = lastMergedIndex - 1; k > i; k--) {
            if (state.numArr[k][j] === -1) {
              // downest empty grid
              state.numArr[k][j] = state.numArr[i][j];
              state.numArr[i][j] = -1;
              move = true;
              break;
            }
            if (!merge && state.numArr[k][j] === state.numArr[i][j]) {
              // merge grid
              state.numArr[k][j] += state.numArr[i][j];
              state.numArr[i][j] = -1;
              lastMergedIndex = k;
              merge = true;
            }
          }
          if (!merge && !move) {
            lastMergedIndex = i + 1;
          }
        }
      }
    },
    moveLeft: (state: UiState) => {
      for (let i = 0; i < GIRD_SIZE; i++) {
        let lastMergedIndex = -1;  // leftest merged grid
        for (let j = 1; j < GIRD_SIZE; j++) {
          // leftest unempty grid
          if (state.numArr[i][j] === -1) continue;

          let merge = false;
          let move = false;
          for (let k = lastMergedIndex + 1; k < j; k++) {
            if (state.numArr[i][k] === -1) {
              // leftest empty grid
              state.numArr[i][k] = state.numArr[i][j];
              state.numArr[i][j] = -1;
              move = true;
              break;
            }
            if (!merge && state.numArr[i][k] === state.numArr[i][j]) {
              // merge grid
              state.numArr[i][k] += state.numArr[i][j];
              state.numArr[i][j] = -1;
              lastMergedIndex = k;
              merge = true;
            }
          }
          if (!merge && !move) {
            lastMergedIndex = j - 1;
          }
        }
      }
    },
    moveRight: (state: UiState) => {
      for (let i = 0; i < GIRD_SIZE; i++) {
        let lastMergedIndex = GIRD_SIZE;  // rightest merged grid
        for (let j = GIRD_SIZE - 2; j >= 0; j--) {
          // rightest unempty grid
          if (state.numArr[i][j] === -1) continue;

          let merge = false;
          let move = false;
          for (let k = lastMergedIndex - 1; k > j; k--) {
            if (state.numArr[i][k] === -1) {
              // rightest empty grid
              state.numArr[i][k] = state.numArr[i][j];
              state.numArr[i][j] = -1;
              move = true;
              break;
            }
            if (!merge && state.numArr[i][k] === state.numArr[i][j]) {
              // merge grid
              state.numArr[i][k] += state.numArr[i][j];
              state.numArr[i][j] = -1;
              lastMergedIndex = k;
              merge = true;
            }
          }
          if (!merge && !move) {
            lastMergedIndex = j + 1;
          }
        }
      }
    }
  }
});

export const selectNumArr = (state: rootState) => state.ui.numArr;
