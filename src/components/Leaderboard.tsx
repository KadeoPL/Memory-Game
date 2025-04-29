import { LeaderboardProps } from "../types/ResultProps";

export default function Leaderboard({ results }: LeaderboardProps) {
  return (
    <>
      {results && results.length > 0 ? (
        results.map((result) => (
          <div
            key={result.id}
            className="text-white text-2xl flex gap-5 justify-between p-4 border-b border-gray-700"
          >
            <div>{result.name}</div>
            <div>{result.result}</div>
          </div>
        ))
      ) : (
        <div className="text-white text-2xl">No results</div>
      )}
    </>
  );
}
