import { useState } from "react";
import { CardProps } from "../types/CardProps";

export default function Card({
  cardObverseBg,
  cardReverseBg,
  disabled,
}: CardProps) {
  const [isCardFlip, setIsCardFlip] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsCardFlip(!isCardFlip);
    }
  };

  return (
    <>
      {isCardFlip ? (
        <div
          onClick={handleClick}
          style={{
            backgroundImage: `url(${cardObverseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`h-30 w-20 rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in-out not-last-of-type:cursor-pointer rotate-y-180`}
        ></div>
      ) : (
        <div
          onClick={handleClick}
          style={{
            backgroundImage: `url(${cardReverseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`h-30 w-20 rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer`}
        ></div>
      )}
    </>
  );
}
