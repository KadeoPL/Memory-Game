import { useResults } from "../hooks/useResults";
import { useState } from "react";
import { difficultyLevels } from "../utils/difficultyLevels";
import Leaderboard from "../components/Leaderboard";
import { Link } from "react-router";

export default function LeaderboardScreen() {
  const [selectLevel, setSelectLevel] = useState<string>("easy");
  const { results, loading } = useResults(selectLevel);

  const handleClick = (level: string) => {
    setSelectLevel(level);
  };

  return (
    <div className="bg-[url(/home_bg.png)] bg-cover bg-top bg-no-repeat w-dvw h-dvh flex flex-col justify-center items-center">
      <div className="flex gap-4 mb-4">
        {difficultyLevels.map((level, index) => (
          <button
            key={index}
            className={`text-white text-2xl px-4 py-2 rounded ${
              selectLevel === level.name ? "bg-blue-500" : "bg-gray-700"
            }`}
            onClick={() => {
              handleClick(level.name);
            }}
          >
            {level.text}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-white text-2xl">Ładowanie wyników...</div>
      ) : (
        <Leaderboard results={results} />
      )}

      <div className=" mt-16">
        <Link to="/" className="text-xl font-pirata text-white">
          Back
        </Link>
      </div>
    </div>
  );
}
