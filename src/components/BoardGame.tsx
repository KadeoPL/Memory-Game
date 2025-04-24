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

      if (checkingCard(firstCard, secondCard)) {
        const updatedCards = updateMatchedCards([firstCard, secondCard]);
        setGameState({ ...gameState, cards: updatedCards });
        setFirstCard(null);
        setSecondCard(null);
      } else {
        const updatedCards = resetFlipedCard([firstCard, secondCard]);
        const timer = setTimeout(() => {
          setGameState({ ...gameState, cards: updatedCards });
          setFirstCard(null);
          setSecondCard(null);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [firstCard, secondCard]);

  const updateMatchedCards = (matchedCards: CardProps[]) => {
    const updatedCards = gameState.cards.map((card) => {
      if (matchedCards.some((matchedCard) => matchedCard.id === card.id)) {
        return { ...card, isMatched: true };
      }
      return card;
    });

    return updatedCards;
  };

  const handleRestartClick = () => {
    setGameState(initializeGame(state.moves));
    setFirstCard(null);
    setSecondCard(null);
  };

  const updateFlipedCard = (flippedCards: CardProps[]) => {
    const updatedCards = gameState.cards.map((card) => {
      if (flippedCards.some((flippedCard) => flippedCard.id === card.id)) {
        return { ...card, isFlipped: !card.isFlipped };
      }
      return card;
    });

    return updatedCards;
  };

  const resetFlipedCard = (flippedCards: CardProps[]) => {
    const updatedCards = gameState.cards.map((card) => {
      if (flippedCards.some((flippedCard) => flippedCard.id === card.id)) {
        return { ...card, isFlipped: false };
      }
      return card;
    });

    return updatedCards;
  };

  const handleCardClick = (clickedCard: CardProps) => {
    if (clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }

    if (firstCard && secondCard && !checkingCard(firstCard, secondCard)) {
      const updatedCards = resetFlipedCard([firstCard, secondCard]);
      setGameState({ ...gameState, cards: updatedCards });
      setFirstCard(null);
      setSecondCard(null);
    }

    if (!firstCard || !secondCard) {
      const updatedCards = updateFlipedCard([clickedCard]);
      setGameState({ ...gameState, cards: updatedCards });

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
