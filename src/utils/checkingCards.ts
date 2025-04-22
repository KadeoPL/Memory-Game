import { CardProps } from "../types/CardProps";
export const checkingCard = (firstCard: CardProps, secondCard: CardProps) =>
  firstCard.name === secondCard.name;
