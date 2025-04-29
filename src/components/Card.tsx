import { CardProps } from "../types/CardProps";
import cardReverseBg from "../assets/cards/back_card_320x480.png";

export default function Card({ image, isFlipped, isMatched }: CardProps) {
  return (
    <>
      {isFlipped ? (
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: isMatched ? 0.3 : 1,
          }}
          className={`w-full h-full rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in-out border-amber-500  shadow-amber-300 ${
            !isMatched
              ? "cursor-pointer border-2 shadow-md"
              : "shadow-none border-0"
          } rotate-y-180`}
        ></div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${cardReverseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`w-full h-full  rounded-xl drop-shadow-2xl hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer `}
        ></div>
      )}
    </>
  );
}
