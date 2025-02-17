import { ReactElement, useEffect, useState } from "react";
import { Line } from "./components/grid-components";
import "./styles.css";

const API_URL =
  "https://raw.githubusercontent.com/chidiwilliams/wordle/refs/heads/main/src/data/words.json";

export default function App() {
  const [answer, setAnswer] = useState<string>("");
  const [turnNumber, setTurnNumber] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState<string>("");

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      setCurrentGuess((prev) => {
        if (prev.length < 5) return prev + e.key;
        return prev;
      });
    } else if (e.key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (e.key === "Enter") {
      setTurnNumber((prev) => prev + 1);
    }
  };

  // Fetch words from API
  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      // TODO: randomize chosen
      setAnswer(words[0]);
    };

    fetchWords();
  }, []);

  // Add keydown event listener
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // When list of guesses changes, check if the game is over
  useEffect(() => {
    if (turnNumber === 6) {
      alert("Game over!");
      setGuesses(Array(6).fill(""));
      setTurnNumber(0);
    } else {
      if (answer.length === 5 && currentGuess === answer) {
        alert("You win!");
        setGuesses(Array(6).fill(""));
        setTurnNumber(0);
      } else {
        console.log(answer);
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[turnNumber - 1] = currentGuess;
          return newGuesses;
        });
        setCurrentGuess("");
      }
    }
  }, [turnNumber]);

  return (
    <div className="app">
      {guesses.map((guess, idx) => {
        if (idx === turnNumber) {
          return <Line key={idx} word={currentGuess} />;
        } else {
          return <Line key={idx} word={guess} />;
        }
      })}
    </div>
  );
}
