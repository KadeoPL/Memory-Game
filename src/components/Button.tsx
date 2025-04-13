export default function Button({ text }: { text: string }) {
  return (
    <button className="start-button font-pirata uppercase text-2xl hover:scale-105 transiton-all duration-700 ease-in-out">
      <span className="drop-shadow-2xl text-gray-300">{text}</span>
    </button>
  );
}
