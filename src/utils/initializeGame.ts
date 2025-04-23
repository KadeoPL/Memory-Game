import generateCards from "./generateCards";
import { cardsData } from "./Cards";

export default function initializeGame(moves: number) {
  const gameCards = generateCards(cardsData);

  const gameData = {
    cards: gameCards,
    matchedPairs: 0,
    moves: moves,
    isGameOver: false,
  };

  return gameData;
}
