import Card from "../components/Card";
import cardBg from "../assets/cards/card_1.png";

export default function GameScreen() {
  return (
    <div className="bg-[url(/public/home_bg.png)] bg-cover bg-top bg-no-repeat w-dvw h-dvh flex flex-col justify-center items-center">
      <Card cardObverseBg={cardBg} cardReverseBg={cardBg} />
    </div>
  );
}
