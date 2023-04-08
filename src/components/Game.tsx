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

  const throttledHandleKeyDown = useThrottledCallback(
    handleKeyDown,
    animationDuration,
    { leading: true, trailing: false }
  );

  React.useEffect(() => {
    window.addEventListener("keydown", throttledHandleKeyDown);

    return () => {
      window.removeEventListener("keydown", throttledHandleKeyDown);
    };
  }, [throttledHandleKeyDown]);

  return <Board tiles={tiles} />;
}
