import { CardProps } from "../types/CardProps";
import { GameState } from "../types/GameState";

export default function updateCards(
  selectedCards: CardProps[],
  action: string,
  gameState: GameState
): CardProps[] {
  let updatedCards = [...gameState.cards];

  switch (action) {
    case "flip":
      updatedCards = updatedCards.map((card) => {
        if (selectedCards.some((selectedCard) => selectedCard.id === card.id)) {
          return { ...card, isFlipped: !card.isFlipped };
        }
        return card;
      });
      break;

    case "reset":
      updatedCards = updatedCards.map((card) => {
        if (selectedCards.some((selectedCard) => selectedCard.id === card.id)) {
          return { ...card, isFlipped: false };
        }
        return card;
      });
      break;

    case "matched":
      updatedCards = updatedCards.map((card) => {
        if (selectedCards.some((selectedCard) => selectedCard.id === card.id)) {
          return { ...card, isMatched: true };
        }
        return card;
      });
      break;
  }

  return updatedCards;
}
