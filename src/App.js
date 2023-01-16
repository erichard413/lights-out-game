import React from "react";
import Board from "./Board";
import "./App.css";
import {v4 as uuidv4} from 'uuid';

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <Board />
      </div>
  );
}

export default App;
