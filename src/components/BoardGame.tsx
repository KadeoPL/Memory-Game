import Card from "../components/Card";
import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import { useLocation } from "react-router";
import initializeGame from "../utils/initializeGame";
import { Link } from "react-router";
import { CardProps } from "../types/CardProps";
import { checkingCard } from "../utils/checkingCards";
import updateCards from "../utils/updateCards";
import Popup from "./Popup";

export default function BoardGame() {
  const location = useLocation();
  const state = location.state as {
    moves: number;
    difficulty: string;
    time: number;
  };
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    pairs: null,
    moves: 0,
    isGameOver: false,
    difficulty: "",
    time: 0,
  });
  const [firstCard, setFirstCard] = useState<CardProps | null>(null);
  const [secondCard, setSecondCard] = useState<CardProps | null>(null);
  const [isGameOver, setIsGamerOver] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [timeIsRunning, setTimeIsRunning] = useState<boolean>(true);

  useEffect(() => {
    setGameState(initializeGame(state.moves, state.difficulty, state.time));
  }, [state.moves]);

  useEffect(() => {
    if (
      (gameState.moves === 0 &&
        gameState.pairs != matchedPairs &&
        gameState.pairs) ||
      !timeIsRunning
    ) {
      setIsWin(false);
      setIsGamerOver(true);
      setGameState((prevState) => ({ ...prevState, moves: 0 }));
      setGameState((prevState) => ({ ...prevState, time: 0 }));
      setTimeIsRunning(false);
    } else if (gameState.pairs === matchedPairs) {
      setIsWin(true);
      setIsGamerOver(true);
      setTimeIsRunning(false);
    }
  }, [gameState.moves, matchedPairs, gameState.time]);

  useEffect(() => {
    if (firstCard && secondCard) {
      setGameState((prevState) => {
        const newState = { ...prevState, moves: prevState.moves - 1 };

        if (checkingCard(firstCard, secondCard)) {
          setMatchedPairs(matchedPairs + 1);
          return {
            ...newState,
            cards: updateCards([firstCard, secondCard], "matched", gameState),
          };
        } else {
          setTimeout(() => {
            setGameState((latestState) => ({
              ...latestState,
              cards: updateCards([firstCard, secondCard], "reset", gameState),
            }));
            setFirstCard(null);
            setSecondCard(null);
          }, 1000);

          return newState;
        }
      });

      if (checkingCard(firstCard, secondCard)) {
        setFirstCard(null);
        setSecondCard(null);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    if (!timeIsRunning) return;

    const timerId = setInterval(() => {
      setGameState((prevState) => {
        if (prevState.time <= 1) {
          clearInterval(timerId);
          setTimeIsRunning(false);
          return { ...prevState, time: 0 };
        }
        return { ...prevState, time: prevState.time - 1 };
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeIsRunning]);

  const handleRestartClick = () => {
    setGameState(initializeGame(state.moves, state.difficulty, state.time));
    setFirstCard(null);
    setSecondCard(null);
    setIsGamerOver(false);
    setMatchedPairs(0);
    setTimeIsRunning(true);
  };

  const handleCardClick = (clickedCard: CardProps) => {
    if (
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      isGameOver ||
      !timeIsRunning
    ) {
      return;
    }

    if (!firstCard || !secondCard) {
      setGameState({
        ...gameState,
        cards: updateCards([clickedCard], "flip", gameState),
      });

      firstCard ? setSecondCard(clickedCard) : setFirstCard(clickedCard);
    }
  };

  return (
    <div className="px-5 py-5 w-full max-w-[1000px]">
      <div className="w-full h-10 mb-5 flex justify-between items-center text-white font-grenze text-2xl px-5 py-5">
        <div className="font-pirata">
          Moves:
          <span
            className={`${
              gameState.moves > 5
                ? "text-amber-500"
                : "text-red-600 animate-pulse"
            } ml-2 `}
          >
            {gameState.moves}
          </span>
        </div>
        <div className="font-pirata">
          Time:
          <span
            className={`${
              gameState.time > 15
                ? "text-amber-500"
                : "text-red-600 animate-pulse"
            } ml-2 `}
          >
            {gameState.time}
          </span>
        </div>
        <div>
          <div className="flex flex-row items-center text-base">
            <button className="cursor-pointer active:scale-110 transition-all duration-500 mr-2 lg:mr-5 drop-shadow-2xl  hover:text-amber-400">
              <Link to={"/"}>Home</Link>
            </button>
            <button className="cursor-pointer active:scale-110 transition-all duration-500 mr-2 lg:mr-5 drop-shadow-2xl  hover:text-amber-400">
              <Link to={"/select-level"}>Change difficulty</Link>
            </button>
            <button
              className="cursor-pointer active:scale-110 transition-all duration-500 drop-shadow-2xl  hover:text-amber-400"
              onClick={() => {
                handleRestartClick();
              }}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
      <div
        className={`w-full px-5 md:px-30 lg:px-0 grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 lg:gap-5 gap-1`}
      >
        {gameState.cards.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              handleCardClick(card);
            }}
            className="aspect-[2/3]"
          >
            <Card
              id={card.id}
              name={card.name}
              image={card.image}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
            />
          </div>
        ))}
      </div>
      {isGameOver ? (
        <Popup
          isWin={isWin}
          onRestartClick={handleRestartClick}
          moves={gameState.moves}
          difficulty={gameState.difficulty}
          remainingTime={gameState.time}
          matchedPairs={matchedPairs}
        />
      ) : (
        ""
      )}
    </div>
  );
}
