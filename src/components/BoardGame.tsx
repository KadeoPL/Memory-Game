import Card from "../components/Card";
import { cards } from "../utils/Cards";
import cardReverseBg from "../assets/cards/back_card_320x480.png";
import { useState } from "react";
import { CardProps } from "../types/CardProps";
import { checkingCard } from "../utils/checkingCards";

export default function BoardGame() {
  const memoryCards = [...cards, ...cards].map((card, index) => ({
    ...card,
    id: index,
  }));
  const [moves, setMoves] = useState<number>(0);
  const [selectedCards, setSelectedCards] = useState<CardProps[]>([]);

  const selectCard = (card: CardProps) => {
    if (selectedCards.length <= 2) {
      setSelectedCards([...selectedCards, card]);
      if (selectedCards.length === 2) {
        setMoves(moves + 1);
        if (checkingCard(selectedCards)) {
          console.log("Zgadza sie");
        } else {
          console.log("Nie zgadza się");
          setSelectedCards([]);
        }
      }
    }
  };

  return (
    <div>
      <div className="w-full h-10 mb-10 flex justify-between text-white font-pirata text-2xl">
        <div>Moves: {moves}</div>
        {/* <div>Time left: {timeLeft}</div> */}
      </div>
      <div className={`grid grid-cols-6 grid-rows-3 gap-5`}>
        {memoryCards.map((card, index) => (
          <div key={index} onClick={() => selectCard(card)}>
            <Card
              id={card.id}
              cardObverseBg={card.cardObverseBg}
              cardReverseBg={cardReverseBg}
              disabled={selectedCards.length >= 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
