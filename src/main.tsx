import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameState, INITIAL_GAME_STATE, addKeypressHandler } from "./state";
import { createStore } from "@watchable/store";

const gameStore = createStore<GameState>(INITIAL_GAME_STATE);
addKeypressHandler(gameStore);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App {...{ gameStore }} />
  </React.StrictMode>
);
