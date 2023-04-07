import React from 'react';
import { Game } from "../components/Game";
import { ButtonGroup } from "../components/ButtonGroup";
import {Stack} from "@mui/material";

function App() {
  return (
    <Stack className="App" spacing={5}>
      <ButtonGroup />
      <Game />
    </Stack>
  );
}

export default App;
