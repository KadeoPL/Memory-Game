import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router";
import { difficultyLevels } from "../utils/difficultyLevels";

export default function SelectLevel() {
  return (
    <div className="bg-[url(/public/home_bg.png)] bg-cover bg-top bg-no-repeat w-svw h-svh flex flex-col justify-center items-center">
      <div className="w-full flex justify-center mb-10">
        <h1 className="w-1/2 text-center text-white font-pirata text-3xl md:text-4xl mb-8 drop-shadow-2xl">
          Choose difficulty
        </h1>
      </div>
      <div className="flex flex-col gap-16 items-center">
        {difficultyLevels.map((level, index) => (
          <Link
            key={index}
            to="/game"
            state={{ moves: level.moves, difficulty: level.name }}
          >
            <PrimaryButton text={level.text} animationPulse={false} />
          </Link>
        ))}
      </div>
    </div>
  );
}
