import React from 'react';
import { Game } from "../components/Game";
import { ButtonGroup } from "../components/ButtonGroup";
import { SelectGroup } from "../components/SelectGroup";
import {Stack} from "@mui/material";

function App() {
  return (
    <Stack className="App" spacing={5} justifyContent={'center'} alignItems={'center'}>
      <ButtonGroup />
      <Game />
      <SelectGroup />
    </Stack>
  );
}

export default App;
