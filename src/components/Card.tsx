import { useEffect, useState } from "react";

export default function Card() {
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
          className={`bg-green-500 h-30 w-20 rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in ${animationClass}`}
        >
          Card
        </div>
      ) : (
        <div
          onClick={() => setIsCardFlip(true)}
          className={`bg-red-500 h-30 w-20 rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in ${animationClass}`}
        >
          Card
        </div>
      )}
    </>
  );
}
