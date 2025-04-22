import Card from "../components/Card";
import { cards } from "../utils/Cards";
import { useEffect, useState } from "react";
import { CardProps } from "../types/CardProps";
import { checkingCard } from "../utils/checkingCards";
import { shuffleCards } from "../utils/shuffleCards";

export default function BoardGame() {
  const memoryCards = [...cards, ...cards].map((card) => ({
    ...card,
    id: Math.random(),
  }));
  const [gameCards, setGameCards] = useState<CardProps[]>([]);
  const [firstSelectedCard, setFirstSelectedCard] =
    useState<CardProps | null>();
  const [secondSelectedCard, setSecondSelectedCard] =
    useState<CardProps | null>();
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    setGameCards(shuffleCards(memoryCards));
  }, [isGameComplete]);

  useEffect(() => {
    if (firstSelectedCard && secondSelectedCard) {
      const isMatch = checkingCard(firstSelectedCard, secondSelectedCard);

      setTimeout(() => {
        setGameCards((prevCards) =>
          prevCards.map((card) => {
            if (
              card.id === firstSelectedCard.id ||
              card.id === secondSelectedCard.id
            ) {
              if (isMatch) {
                return { ...card, isMatched: true };
              } else {
                return { ...card, isFlipped: false };
              }
            }
            return card;
          })
        );

        setFirstSelectedCard(null);
        setSecondSelectedCard(null);
      }, 1000);
    }
  }, [secondSelectedCard]);

  const handleCardClick = (clickedCard: CardProps) => {
    if (clickedCard.isMatched || clickedCard.isFlipped) {
      return;
    }

    if (firstSelectedCard && secondSelectedCard) {
      return;
    }

    setGameCards((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );

    firstSelectedCard
      ? setSecondSelectedCard(clickedCard)
      : setFirstSelectedCard(clickedCard);
  };

  return (
    <div>
      <div className="w-full h-10 mb-10 flex justify-between text-white font-pirata text-2xl"></div>
      <div className={`grid grid-cols-6 grid-rows-3 gap-5`}>
        {gameCards.map((card, index) => (
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
      <button
        onClick={() => {
          setIsGameComplete(true);
        }}
      >
        End Game
      </button>
    </div>
  );
}
