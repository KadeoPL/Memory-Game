import { CardProps } from "../types/CardProps";
export const shuffleCards = (cards: CardProps[]) => {
  return [...cards].sort(() => Math.random() - 0.5);
};
