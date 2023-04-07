import React from 'react';
import { Game } from "../components/Game";
import { Button } from "../components/Button";

function App() {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <div className="App">
      <Button></Button>
      <Game key={date.toISOString()} />
    </div>
  );
}

export default App;
