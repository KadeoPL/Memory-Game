import { difficultyLevels } from "./difficultyLevels";

export default function countPoints(
  moves: number,
  difficulty: string,
  remainingTime: number
): number {
  const difficultyLevel = difficultyLevels.find(
    (level) => level.name === difficulty
  );

  if (difficultyLevel) {
    return (
      moves * difficultyLevel.points.moves +
      remainingTime * difficultyLevel.points.time +
      1000
    );
  }

  return 0;
}
