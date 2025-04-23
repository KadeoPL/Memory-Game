import Button from "../components/Button";
import { OnChangeViewProps } from "../types/onChangeView";

export default function SelectLevelScreen({
  onButtonClick,
}: OnChangeViewProps) {
  return (
    <div className="bg-[url(/public/home_bg.png)] bg-cover bg-top bg-no-repeat w-dvw h-dvh flex flex-col justify-center items-center">
      <h1 className="w-1/2 text-center text-white font-pirata text-5xl md:text-6xl mb-8 drop-shadow-xl">
        Choose a difficulty
      </h1>
      <Button onClick={() => onButtonClick("game")} text="Easy" moves={60} />
      <Button onClick={() => onButtonClick("game")} text="Medium" moves={40} />
      <Button onClick={() => onButtonClick("game")} text="Hard" moves={20} />
    </div>
  );
}
