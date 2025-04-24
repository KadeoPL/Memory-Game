import { CardProps } from "./CardProps";
export interface GameState {
  cards: CardProps[];
  matchedPairs: number | null;
  moves: number;
  isGameOver: boolean;
}
