export default function Button({ text }: { text: string }) {
  return (
    <button
      className={`
    relative px-60 py-3
    w-auto min-w-[200px]
    inline-block text-center
    border-solid border-8
    border-image-source-[url('/public/home_bg.png')]
    border-image-slice-9
    border-image-repeat-stretch
    transition-transform duration-100
    
  `}
      style={{
        backgroundImage: "url('/public/home_bg.png')",
        backgroundSize: "cover",
      }}
    >
      <span className="relative text-white font-bold tracking-wider text-xl">
        {text}
      </span>
    </button>
  );
}
