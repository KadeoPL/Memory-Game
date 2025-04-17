import { useState } from "react";
import Card from "../components/Card";
import { cards } from "../utils/Cards";

export default function BoardGame() {
  const memoryCards = [...cards, ...cards].map((card, index) => ({
    ...card,
    id: index,
  }));

  const [moves, setMovers] = useState(0);
  const [timeLeft, SetTimeLeft] = useState(0);

  return (
    <div>
      <div className="w-full h-10 mb-10 flex justify-between text-white font-pirata text-2xl">
        <div>Moves: {moves}</div>
        <div>Time left: {timeLeft}</div>
      </div>
      <div className={`grid grid-cols-4 grid-rows-4 gap-10`}>
        {memoryCards.map((card, index) => (
          <Card
            name={card.name}
            key={index}
            cardObverseBg={card.imageUrl}
            cardReverseBg={card.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
