import { useState } from "react";
import { CardProps } from "../types/CardProps";

export default function Card({ cardObverseBg, cardReverseBg }: CardProps) {
  const [isCardFlip, setIsCardFlip] = useState(false);

  return (
    <>
      {isCardFlip ? (
        <div
          onClick={() => setIsCardFlip(!isCardFlip)}
          style={{
            backgroundImage: `url(${cardObverseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`h-35 w-24 rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in-out not-last-of-type:cursor-pointer rotate-y-180`}
        ></div>
      ) : (
        <div
          onClick={() => setIsCardFlip(!isCardFlip)}
          style={{
            backgroundImage: `url(${cardReverseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`h-35 w-24 rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer`}
        ></div>
      )}
    </>
  );
}
