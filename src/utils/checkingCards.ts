import { CardProps } from "../types/CardProps";
export const checkingCard = (cards: CardProps[]) =>
  cards[0].name === cards[1].name;
