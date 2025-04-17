import Card from "../components/Card";
import { cards } from "../utils/Cards";
import cardReverseBg from "../assets/cards/back_card_320x480.png";
import { useState } from "react";
import { CardProps } from "../types/CardProps";

export default function BoardGame() {
  const memoryCards = [...cards, ...cards].map((card, index) => ({
    ...card,
    id: index,
  }));

  const [selectedCards, setSelectedCards] = useState<CardProps[]>([]);

  const selectCard = (card: CardProps) => {
    if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, card]);
    } else {
      console.log("Dwie karty zaznaczone");
      console.log(selectedCards);
    }
  };

  return (
    <div>
      <div className="w-full h-10 mb-10 flex justify-between text-white font-pirata text-2xl">
        {/* <div>Moves: {moves}</div>
        <div>Time left: {timeLeft}</div> */}
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
