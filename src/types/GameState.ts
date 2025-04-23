import { CardProps } from "./CardProps";
export interface GameState {
  cards: CardProps[];
  matchedPairs: number;
  moves: number;
  isGameOver: boolean;
}
