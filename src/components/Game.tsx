import * as React from 'react';
import { useGame } from "../hooks/useGame";
import { Board } from "./Board";

export const Game = () => {
  const [tiles, moveLeft, moveRight, moveUp, moveDown] = useGame();

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();

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
  };


  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return <Board tiles={tiles} />;
}
