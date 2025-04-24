import generateCards from "./generateCards";
import { cardsData } from "./Cards";

export default function initializeGame(moves: number) {
  const gameCards = generateCards(cardsData);

  const pairs = gameCards.length / 2;

  const gameData = {
    cards: gameCards,
    pairs: pairs,
    moves: moves,
    isGameOver: false,
  };

  return gameData;
}
