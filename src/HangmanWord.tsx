import { useRootState, useSelected } from "@watchable/store-react";
import { GameProps, isLoser } from "./state";

type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export function HangmanWord(props: GameProps) {
  const state = useRootState(props.gameStore);
  const { guessedLetters, wordToGuess } = state;
  const loser = isLoser(state);
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || loser ? "visible" : "hidden",
              color:
                !guessedLetters.includes(letter) && loser ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
