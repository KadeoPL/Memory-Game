import Card from "../components/Card";
import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import { useLocation } from "react-router";
import initializeGame from "../utils/initializeGame";
import { Link } from "react-router";
import { CardProps } from "../types/CardProps";
import { checkingCard } from "../utils/checkingCards";

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

  useEffect(() => {
    setGameState(initializeGame(state.moves));
  }, [state.moves]);

  useEffect(() => {
    if (firstCard && secondCard) {
      setGameState({ ...gameState, moves: gameState.moves - 1 });
      checkingCard(firstCard, secondCard);
    }
  }, [firstCard, secondCard]);

  const handleRestartClick = () => {
    console.log("klik");
    setGameState(initializeGame(state.moves));
    console.log(gameState);
  };

  const handleCardClick = (clickedCard: CardProps) => {
    if (clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }

    if (!firstCard || !secondCard) {
      const updatedCards = gameState.cards.map((card) => {
        if (card.id === clickedCard.id) {
          return { ...card, isFlipped: true };
        }
        return card;
      });

      firstCard ? setSecondCard(clickedCard) : setFirstCard(clickedCard);

      setGameState({ ...gameState, cards: updatedCards });
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
            }`}
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
