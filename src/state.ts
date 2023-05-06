import { Immutable, Store } from "@watchable/store";
import { edit } from "@watchable/store-edit";
import words from "./wordList.json";

export interface GameState {
  wordToGuess: string;
  guessedLetters: string[];
}

export interface GameProps {
  gameStore: Store<GameState>;
}

export const INITIAL_GAME_STATE = {
  wordToGuess: getRandomWord(),
  guessedLetters: [],
} as const satisfies Immutable<GameState>;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export function addKeypressHandler(gameStore: Store<GameState>) {
  const handler = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === "Enter") {
      // reset the game
      edit(gameStore, (draft) => {
        draft.guessedLetters = [];
        draft.wordToGuess = getRandomWord();
      });
    } else if (key.match(/^[a-z]$/)) {
      // add a letter to the game
      addGuessedLetter(gameStore, key);
    } else {
      return;
    }
    e.preventDefault();
  };
  // subscribe
  document.addEventListener("keypress", handler);
  // return unsubscribe
  return () => document.removeEventListener("keypress", handler);
}

export function addGuessedLetter(gameStore: Store<GameState>, letter: string) {
  edit(gameStore, (draft) => {
    const { guessedLetters } = draft;
    if (guessedLetters.includes(letter) || isLoser(draft) || isWinner(draft)) {
      return;
    }
    guessedLetters.push(letter);
  });
}

export function getIncorrectLetters({
  guessedLetters,
  wordToGuess,
}: Immutable<GameState>) {
  return guessedLetters.filter((letter) => !wordToGuess.includes(letter));
}

export function getActiveLetters({
  guessedLetters,
  wordToGuess,
}: Immutable<GameState>) {
  return guessedLetters.filter((letter) => wordToGuess.includes(letter));
}

export function isWinner({
  wordToGuess,
  guessedLetters,
}: Immutable<GameState>) {
  return wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));
}

export function isLoser(state: Immutable<GameState>) {
  return getIncorrectLetters(state).length >= 6;
}
