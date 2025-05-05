import { useResults } from "../hooks/useResults";
import { useState } from "react";
import { difficultyLevels } from "../utils/difficultyLevels";
import Leaderboard from "../components/Leaderboard";
import { Link } from "react-router";
import leftBg from "../assets/memory_popup_bg_L.png";
import rightBg from "../assets/memory_popup_bg_R.png";
import middleBg from "../assets/memory_popup_bg_M.png";

export default function LeaderboardScreen() {
  const [selectLevel, setSelectLevel] = useState<string>("easy");
  const { results, loading } = useResults(selectLevel);

  const handleClick = (level: string) => {
    setSelectLevel(level);
  };

  return (
    <div className="bg-[url(/home_bg.png)] bg-cover bg-top bg-no-repeat w-dvw h-dvh flex flex-col justify-center items-center">
      <div className="flex gap-4 mb-10 font-pirata">
        {difficultyLevels.map((level, index) => (
          <button
            key={index}
            className={`text-white text-2xl px-4 py-2 rounded ${
              selectLevel === level.name ? "font-bold" : "font-regular"
            }`}
            onClick={() => {
              handleClick(level.name);
            }}
          >
            {level.text}
          </button>
        ))}
      </div>
      <div className="w-[80%] h-[400px] max-w-[700px] z-10 relative">
        <div
          className="absolute left-0 top-0 w-[117px] h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${leftBg})` }}
        ></div>

        <div
          className="absolute left-[90px] right-[90px] top-[0px] h-[400px] bg-center bg-contain z-20"
          style={{
            backgroundImage: `url(${middleBg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div
          className="absolute right-0 top-0 w-[117px] h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${rightBg})` }}
        ></div>
      </div>

      <div className="absolute left-2 right-2 h-[400px] flex flex-col items-center justify-center z-30 text-amber-100 font-grenze">
        {loading ? (
          <div className="text-white text-2xl">Loading...</div>
        ) : (
          <Leaderboard results={results} />
        )}
      </div>
      <div className=" mt-16">
        <Link to="/" className="text-xl font-pirata text-white cursor-pointer">
          Back
        </Link>
      </div>
    </div>
  );
}
