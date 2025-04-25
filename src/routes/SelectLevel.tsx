import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router";
export default function SelectLevel() {
  return (
    <div className="bg-[url(/public/home_bg.png)] bg-cover bg-top bg-no-repeat w-dvw h-dvh flex flex-col justify-center items-center">
      <div className="w-full flex justify-center mb-10">
        <h1 className="w-1/2 text-center text-white font-pirata text-3xl md:text-4xl mb-8 drop-shadow-2xl">
          Choose difficulty
        </h1>
      </div>
      <div className="flex flex-col gap-16 items-center">
        <Link to="/game" state={{ moves: "40" }}>
          <PrimaryButton text="Easy" animationPulse={false} />
        </Link>
        <Link to="/game" state={{ moves: "30" }}>
          <PrimaryButton text="Medium" animationPulse={false} />
        </Link>
        <Link to="/game" state={{ moves: "20" }}>
          <PrimaryButton text="Hard" animationPulse={false} />
        </Link>
      </div>
    </div>
  );
}
