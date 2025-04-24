import generateCards from "./generateCards";
import { cardsData } from "./Cards";

export default function initializeGame(moves: number) {
  const gameCards = generateCards(cardsData);

  const matchedPairs = gameCards.length / 2;

  const gameData = {
    cards: gameCards,
    matchedPairs: matchedPairs,
    moves: moves,
    isGameOver: false,
  };

  return gameData;
}
