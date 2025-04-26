import { CardProps } from "./CardProps";
export interface GameState {
  cards: CardProps[];
  pairs: number | null;
  moves: number;
  isGameOver: boolean;
  difficulty: string;
}
