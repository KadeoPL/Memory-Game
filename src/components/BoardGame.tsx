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
  const [moves, setMoves] = useState<number>(0);
  const [matchedCardsCounter, setMatchedCardsCounter] = useState<number>(0);
  // const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setGameCards(shuffleCards(memoryCards));
    setMoves(20);
  }, [isGameComplete]);

  // useEffect(() => {
  //   checkingGameComplete();
  // }, [moves, matchedCardsCounter]);

  // const checkingGameComplete = () => {
  //   if (matchedCardsCounter === gameCards.length / 2) {
  //     alert("Brawo, wygrałeś!");
  //     if (window.confirm("Spróbuj ponownie!")) {
  //       setIsGameComplete(true);
  //     }
  //   }

  //   if (moves <= 1) {
  //     alert("Przegrałeś!");
  //     if (window.confirm("Spróbuj ponownie!")) {
  //       setIsGameComplete(true);
  //     }
  //   }
  // };

  useEffect(() => {
    if (firstSelectedCard && secondSelectedCard) {
      const isMatch = checkingCard(firstSelectedCard, secondSelectedCard);
      setMoves(moves - 1);

      setTimeout(() => {
        setGameCards((prevCards) =>
          prevCards.map((card) => {
            if (
              card.id === firstSelectedCard.id ||
              card.id === secondSelectedCard.id
            ) {
              if (isMatch) {
                setMatchedCardsCounter(matchedCardsCounter + 1);
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
    if (clickedCard.isMatched || clickedCard.isFlipped || isGameComplete) {
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
      <div className="w-full h-10 mb-10 flex justify-between text-white font-pirata text-3xl">
        <div>
          Moves:
          <span
            className={`${
              moves > 5 ? "text-amber-500" : "text-red-600 animate-pulse"
            }`}
          >
            {moves}
          </span>
        </div>
        {/* Time: {time} */}
      </div>
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
    </div>
  );
}
