import Card from "../components/Card";
import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import { useLocation } from "react-router";
import initializeGame from "../utils/initializeGame";

export default function BoardGame() {
  const location = useLocation();
  const state = location.state as { moves: number };
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    matchedPairs: 0,
    moves: 0,
    isGameOver: false,
  });

  useEffect(() => {
    setGameState(initializeGame(state.moves));
  }, [state.moves]);

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
      </div>
      <div className={`grid grid-cols-6 grid-rows-3 gap-5`}>
        {gameState.cards.map((card, index) => (
          <div
            key={index}
            // onClick={() => {
            //   handleCardClick(card);
            // }}
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
