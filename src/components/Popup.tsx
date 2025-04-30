import { Link } from "react-router";
import { useEffect, useState } from "react";
import countPoints from "../utils/countPoints";
import leftBg from "../assets/memory_popup_bg_L.png";
import rightBg from "../assets/memory_popup_bg_R.png";
import middleBg from "../assets/memory_popup_bg_M.png";
import useSaveResults from "../hooks/useSaveResults";

interface PopupProps {
  isWin: boolean | null;
  onRestartClick: () => void;
  moves: number;
  difficulty: string;
  remainingTime: number;
  matchedPairs: number;
}

export default function Popup({
  isWin,
  onRestartClick,
  moves,
  difficulty,
  remainingTime,
  matchedPairs,
}: PopupProps) {
  const [playerName, setPlayerName] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { saveResult, saving, error, success } = useSaveResults(difficulty);

  useEffect(() => {
    const calculatedScore = countPoints(
      moves,
      difficulty,
      remainingTime,
      matchedPairs
    );
    setScore(calculatedScore);
  }, [moves]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim()) {
      setAlert("Please enter your name!");
    } else if (isSaved) {
      setAlert("Result is already saved!");
    } else {
      await saveResult(playerName, score);
      setIsSaved(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSaved) return;
    setPlayerName(e.target.value);
    if (alert) {
      setAlert("");
    }
  };

  const handleRestart = () => {
    setIsSaved(false);
    onRestartClick();
  };

  return (
    <div className="absolute z-10 top-0 left-0">
      <div className="bg-black/60 bg-cover w-svw h-svh flex justify-center items-center ">
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

          <div className="absolute left-2 right-2 h-[400px] flex flex-col items-center justify-center z-30 text-amber-100 font-grenze">
            <div className="mb-5 text-5xl">
              {isWin ? "You Win" : "You lose"}
            </div>
            <div className="mb-5">
              <h1 className="text-xl md:text-2xl text-center">
                Your points: <span className="font-bold ">{score}</span>
              </h1>
            </div>
            {isWin ? (
              <div className="flex flex-col items-center">
                <h2 className="mb-5 text-center">
                  Save your score in the Leaderboard!
                </h2>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="px-2 py-3 border-2 border-amber-100"
                    disabled={isSaved}
                  />
                  <button
                    className="cursor-pointer bg-amber-500 text-white ml-2 px-5 py-3"
                    type="submit"
                    disabled={isSaved}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  {error && <p> Error: {error.message}</p>}
                  {success && <p> Success!</p>}
                </form>

                {alert ? <div className="mt-2 text-red-500">{alert}</div> : ""}
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-row gap-2 md:gap-5 mt-10">
              <button
                className="cursor-pointer hover:text-amber-400"
                onClick={handleRestart}
              >
                Restart game
              </button>
              <button className="hover:text-amber-400">
                <Link to="/select-level">Change difficulty</Link>
              </button>
              <button className="hover:text-amber-400">
                <Link to="/leaderboard">Leaderboard</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
