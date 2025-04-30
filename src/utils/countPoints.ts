import { difficultyLevels } from "./difficultyLevels";

export default function countPoints(
  moves: number,
  difficulty: string,
  remainingTime: number,
  matchedPairs: number
): number {
  const difficultyLevel = difficultyLevels.find(
    (level) => level.name === difficulty
  );

  if (difficultyLevel) {
    return (
      moves * difficultyLevel.points.moves +
      remainingTime * difficultyLevel.points.time +
      matchedPairs * difficultyLevel.points.matchedPairs
    );
  }

  return 0;
}
