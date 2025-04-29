import { useEffect } from "react";

const AnimatedBackground = () => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      @keyframes move {
        100% {
          transform: translate3d(0, 0, 1px) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const colors = ["#ff8c2e", "#fff2c2", "#863c3c"];

  const spans = Array.from({ length: 32 }, (_, index) => {
    const color = colors[index % 3];
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const animationDuration = 6;
    const transformOriginX = Math.floor(Math.random() * 25) - 12;
    const transformOriginY = Math.floor(Math.random() * 25) - 12;
    const shadowDirection = Math.random() > 0.5 ? 2 : -2;
    const shadowSize = (Math.random() * 1.2 + 0.2).toFixed(4);

    return (
      <span
        key={index}
        className="absolute w-1 h-1 rounded-full"
        style={{
          backgroundColor: color,
          top: `${top}%`,
          left: `${left}%`,
          animation: `move ${animationDuration}s linear infinite`,
          animationDelay: "-1s",
          transformOrigin: `${transformOriginX}vw ${transformOriginY}vh`,
          boxShadow: `${shadowDirection}vmin 0 ${shadowSize}vmin ${color}`,
          backfaceVisibility: "hidden",
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-transparent">
      {spans}
    </div>
  );
};

export default AnimatedBackground;
