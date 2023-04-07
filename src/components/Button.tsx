import * as React from 'react';
import { uiSlice } from "../store/uiSlice";
import { useDispatch } from "react-redux";

export const Button = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(uiSlice.actions.undo());
  }

  return (
    <button className="button" onClick={handleClick}>
      Undo
    </button>
  );
}
