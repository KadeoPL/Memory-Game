import { difficultyLevels } from "./difficultyLevels";

export default function countPoints(moves: number, difficulty: string): number {
  const difficultyLevel = difficultyLevels.find(
    (level) => level.name === difficulty
  );

  if (difficultyLevel) {
    return moves * difficultyLevel.points;
  }

  return 0;
}
