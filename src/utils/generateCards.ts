import { shuffleCards } from "./shuffleCards";
import { CardProps } from "../types/CardProps";

export default function generateCards(cards: CardProps[]) {
  const memoryCards = [...cards, ...cards].map((card) => ({
    ...card,
    id: Math.random(),
    isFlipped: false,
    isMatched: false,
  }));

  const shuffledCards = shuffleCards(memoryCards);
  return shuffledCards;
}
