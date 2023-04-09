import * as React from 'react';
import { useGame } from "../hooks/useGame";
import { Board } from "./Board";
import { useThrottledCallback } from "use-debounce";
import {useDispatch} from "react-redux";
import { animationDuration } from "../config";
import { uiSlice } from "../store/uiSlice";

export const Game = () => {
  const [tiles, moveLeft, moveRight, moveUp, moveDown] = useGame();
  const dispatch = useDispatch();

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
    }

    if (e.ctrlKey && e.code === "KeyZ") {
      dispatch(uiSlice.actions.undo());
    }
  };

  const keyDownNotScrolling = (e: KeyboardEvent) => {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (keys.includes(e.code)) {
      e.preventDefault();
    }
  }

  const throttledHandleKeyDown = useThrottledCallback(
    handleKeyDown,
    animationDuration,
    { leading: true, trailing: false }
  );

  React.useEffect(() => {
    window.addEventListener("keydown", throttledHandleKeyDown);
    window.addEventListener("keydown", keyDownNotScrolling);

    return () => {
      window.removeEventListener("keydown", throttledHandleKeyDown);
      window.removeEventListener("keydown", keyDownNotScrolling);
    };
  }, [throttledHandleKeyDown]);

  return <Board tiles={tiles} />;
}
