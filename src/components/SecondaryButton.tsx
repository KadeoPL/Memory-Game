import { ButtonProps } from "../types/ButtonProps";

export default function SecondaryButton({ text }: ButtonProps) {
  return (
    <button
      className={`secondary-button font-grenze uppercase text-base opacity-80 hover:animate-none hover:scale-105 transiton-all duration-700 ease-in-out`}
    >
      <span className="drop-shadow-2xl text-gray-300">{text}</span>
    </button>
  );
}
