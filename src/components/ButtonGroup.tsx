import * as React from 'react';
import { uiSlice } from "../store/uiSlice";
import { useDispatch } from "react-redux";
import { Button, Stack, Typography } from "@mui/material";

export const ButtonGroup = () => {
  const dispatch = useDispatch();

  const handleUndoClick = () => {
    dispatch(uiSlice.actions.undo());
  }

  const handleRestartClick = () => {
    dispatch(uiSlice.actions.reset());
  }

  return (
    <Stack direction="row" justifyContent={'space-between'}>
      <Button
        className="button"
        variant="contained"
        onClick={handleUndoClick}
        sx={{backgroundColor: "#8f7a66", color: "f9f6f2", textTransform: 'none', "&:hover": {backgroundColor: "#776e65"}}}
      >
        <Typography fontWeight={'bold'}>
          Undo
        </Typography>
      </Button>
      <Button
        className="button"
        variant="contained"
        onClick={handleRestartClick}
        sx={{backgroundColor: "#8f7a66", color: "f9f6f2", textTransform: 'none', "&:hover": {backgroundColor: "#776e65"}}}
      >
        <Typography fontWeight={'bold'}>
          Restart
        </Typography>
      </Button>
    </Stack>
  );
}
