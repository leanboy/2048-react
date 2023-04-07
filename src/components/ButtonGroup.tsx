import * as React from 'react';
import { uiSlice } from "../store/uiSlice";
import { useDispatch } from "react-redux";
import { Button, Stack } from "@mui/material";

export const ButtonGroup = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(uiSlice.actions.undo());
  }

  return (
    <Stack direction="row" justifyContent={'space-between'}>
      <Button
        className="button"
        variant="contained"
        onClick={handleClick}
        sx={{backgroundColor: "#8f7a66", color: "f9f6f2", textTransform: 'none', "&:hover": {backgroundColor: "#776e65"}}}
      >
        Undo
      </Button>
      <Button
        className="button"
        variant="contained"
        onClick={handleClick}
        sx={{backgroundColor: "#8f7a66", color: "f9f6f2", textTransform: 'none', "&:hover": {backgroundColor: "#776e65"}}}
      >
        Restart
      </Button>
    </Stack>
  );
}
