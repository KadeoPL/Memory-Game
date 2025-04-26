import BoardGame from "../components/BoardGame";

export default function GameScreen() {
  return (
    <div className="bg-[url(/public/home_bg.png)] bg-cover bg-top bg-no-repeat w-svw h-svh flex flex-col justify-center items-center">
      <BoardGame />
    </div>
  );
}
