import Button from "../components/Button";
import { OnChangeViewProps } from "../types/onChangeView";

export default function WelcomeScreen({ onButtonClick }: OnChangeViewProps) {
  return (
    <div className="bg-[url(/public/home_bg.png)] bg-cover bg-top bg-no-repeat w-dvw h-dvh flex flex-col justify-center items-center">
      <h1 className="w-1/2 text-center text-white font-pirata text-5xl md:text-6xl mb-8 drop-shadow-2xl">
        Enter the Shadow of Memory
      </h1>
      <Button onClick={() => onButtonClick("level")} text="Play now" />
    </div>
  );
}
