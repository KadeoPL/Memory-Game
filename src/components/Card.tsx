import { useEffect, useState } from "react";
import { CardProps } from "../types/CardProps";

export default function Card({ cardObverseBg, cardReverseBg }: CardProps) {
  const [isCardFlip, setIsCardFlip] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    isCardFlip
      ? setAnimationClass("animate-flip")
      : setAnimationClass("animate-flip-back");
  }, [isCardFlip]);

  return (
    <>
      {isCardFlip ? (
        <div
          onClick={() => setIsCardFlip(false)}
          className={`h-30 w-20 rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in ${animationClass}`}
          style={{
            backgroundImage: `url(${cardObverseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      ) : (
        <div
          onClick={() => setIsCardFlip(true)}
          className={` h-30 w-20 rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in ${animationClass}`}
          style={{
            backgroundImage: `url(${cardReverseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          Card
        </div>
      )}
    </>
  );
}
