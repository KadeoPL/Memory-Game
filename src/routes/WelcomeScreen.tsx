import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { Link } from "react-router";

export default function WelcomeScreen() {
  return (
    <div className="bg-[url(/public/home_bg.png)] bg-cover bg-top bg-no-repeat w-dvw h-dvh flex flex-col justify-center items-center">
      <h1 className="w-1/2 text-center text-white font-pirata text-5xl md:text-6xl mb-16 drop-shadow-2xl">
        Enter the Shadow of Memory
      </h1>
      <Link to="/select-level" className="mb-16">
        <PrimaryButton text="Play now" animationPulse={true} />
      </Link>
      <Link to="/leaderboard">
        <SecondaryButton text="Leaderboard" />
      </Link>
    </div>
  );
}
