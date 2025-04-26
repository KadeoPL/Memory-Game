import { Link } from "react-router";
import { useState } from "react";

interface PopupProps {
  isWin: boolean | null;
  onRestartClick: () => void;
}

export default function Popup({ isWin, onRestartClick }: PopupProps) {
  const [playerName, setPlayerName] = useState<string>("");
  const [alert, setAlert] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim()) {
      setAlert("Please enter your name!");
    }
    console.log(playerName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    if (alert) {
      setAlert("");
    }
  };

  return (
    <div className="absolute z-10 top-0 left-0">
      <div className="bg-black/60 bg-cover w-svw h-svh flex justify-center items-center">
        <div className="w-[80%] h-[400px] lg:w-[600px] z-10 bg-black border-2 border-amber-100 flex flex-col items-center justify-center text-amber-100 font-grenze">
          <div className="mb-10">{isWin ? "You Win" : "You lose"}</div>
          {isWin ? (
            <div className="flex flex-col items-center">
              <h2 className="mb-5">Save your score in the Leaderboard!</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="px-2 py-3 border-2 border-amber-100 "
                />
                <button
                  className="cursor-pointer bg-amber-500 text-white ml-2 px-5 py-3"
                  type="submit"
                >
                  Save
                </button>
              </form>
              {alert ? alert : ""}
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-5 mt-10 ">
            <button
              className="cursor-pointer hover:text-amber-400"
              onClick={onRestartClick}
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
  );
}
