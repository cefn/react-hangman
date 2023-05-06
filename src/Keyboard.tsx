import { useRootState } from "@watchable/store-react";
import styles from "./Keyboard.module.css";
import {
  GameProps,
  addGuessedLetter,
  getActiveLetters,
  getIncorrectLetters,
  isLoser,
  isWinner,
} from "./state";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function Keyboard(props: GameProps) {
  const state = useRootState(props.gameStore);
  const activeLetters = getActiveLetters(state);
  const incorrectLetters = getIncorrectLetters(state);
  const disabled = isWinner(state) || isLoser(state);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
      }}
    >
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = incorrectLetters.includes(key);
        return (
          <button
            onClick={() => addGuessedLetter(props.gameStore, key)}
            className={`${styles.btn} ${isActive ? styles.active : ""} ${
              isInactive ? styles.inactive : ""
            }`}
            disabled={isInactive || isActive || disabled}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
