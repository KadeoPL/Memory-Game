import BoardGame from "../components/BoardGame";
import AnimatedBackground from "../components/AnimatedBackground";

export default function GameScreen() {
  return (
    <div className="bg-[url(/public/home_bg.png)] bg-cover bg-right md:bg-top bg-no-repeat w-svw h-svh flex flex-col justify-center items-center">
      <AnimatedBackground />
      <BoardGame />
    </div>
  );
}
