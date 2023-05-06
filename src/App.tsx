import { useSelected } from "@watchable/store-react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { GameProps, isLoser, isWinner } from "./state";

function App(props: GameProps) {
  const winner = useSelected(props.gameStore, isWinner);
  const loser = useSelected(props.gameStore, isLoser);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {winner && "Winner! - Refresh to try again"}
        {loser && "Nice Try - Refresh to try again"}
      </div>
      <HangmanDrawing {...props} />
      <HangmanWord {...props} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard {...props} />
      </div>
    </div>
  );
}

export default App;
