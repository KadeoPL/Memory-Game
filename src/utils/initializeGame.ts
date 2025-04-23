import { cardsData } from "../utils/Cards";
import { shuffleCards } from "./shuffleCards";

export default function initializeGame() {
  const memoryCards = [...cardsData, ...cardsData].map((card) => ({
    ...card,
    id: Math.random(),
    isFlipped: false,
    isMatched: false,
  }));

  const shuffledCards = shuffleCards(memoryCards);

  return {
    cards: shuffledCards,
    moves: 20,
  };
}
