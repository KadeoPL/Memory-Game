import Card from "../components/Card";
import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import { useLocation } from "react-router";
import initializeGame from "../utils/initializeGame";
import { Link } from "react-router";
import { CardProps } from "../types/CardProps";
import { checkingCard } from "../utils/checkingCards";
import updateCards from "../utils/updateCards";

export default function BoardGame() {
  const location = useLocation();
  const state = location.state as { moves: number };
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    matchedPairs: 0,
    moves: 0,
    isGameOver: false,
  });
  const [firstCard, setFirstCard] = useState<CardProps | null>(null);
  const [secondCard, setSecondCard] = useState<CardProps | null>(null);
  const [isGameOver, setIsGamerOver] = useState<boolean>(false);

  useEffect(() => {
    setGameState(initializeGame(state.moves));
  }, [state.moves]);

  useEffect(() => {
    if (gameState.moves === 0 && gameState.matchedPairs > 0) {
      alert("Lose");
      setIsGamerOver(true);
      console.log(isGameOver);
    } else if (gameState.matchedPairs === 0) {
      alert("Win");
      setIsGamerOver(true);
      console.log(isGameOver);
    }
  }, [gameState.moves, gameState.matchedPairs]);

  useEffect(() => {
    if (firstCard && secondCard) {
      setGameState((prevState) => {
        const newState = { ...prevState, moves: prevState.moves - 1 };

        if (checkingCard(firstCard, secondCard)) {
          return {
            ...newState,
            cards: updateCards([firstCard, secondCard], "matched", gameState),
            matchedPairs: gameState.matchedPairs - 1,
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

  const handleRestartClick = () => {
    setGameState(initializeGame(state.moves));
    setFirstCard(null);
    setSecondCard(null);
  };

  const handleCardClick = (clickedCard: CardProps) => {
    if (clickedCard.isFlipped || clickedCard.isMatched) {
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
    <div>
      <div className="w-full h-10 mb-10 flex justify-between text-white font-pirata text-3xl">
        <div>
          Moves:
          <span
            className={`${
              gameState.moves > 5
                ? "text-amber-500"
                : "text-red-600 animate-pulse"
            } ml-2`}
          >
            {gameState.moves}
          </span>
        </div>
        <div>
          <div>
            <button className="cursor-pointer active:scale-110 transition-all duration-500 mr-5 text-xl hover:text-amber-400">
              <Link to={"/select-level"}>Change difficulty</Link>
            </button>
            <button
              className="cursor-pointer active:scale-110 transition-all duration-500 text-xl hover:text-amber-400"
              onClick={() => {
                handleRestartClick();
              }}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-6 grid-rows-3 gap-5`}>
        {gameState.cards.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              handleCardClick(card);
            }}
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
    </div>
  );
}
