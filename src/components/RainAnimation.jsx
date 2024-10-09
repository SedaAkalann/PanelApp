import { useEffect } from "react";
import "../css/rainAnimation.css";

const RainAnimation = () => {
  useEffect(() => {
    // Sayfa yüklendiğinde animasyonları başlat
    const rainDrops = document.querySelectorAll(".rain-drop");
    rainDrops.forEach((drop) => {
      drop.style.animationPlayState = "running";
    });
  }, []);

  return (
    <div className="rain-container">
      {[...Array(100)].map((_, index) => (
        <div
          key={index}
          className="rain-drop"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 8 + 8}s`,
          }}
        />
      ))}
    </div>
  );
};

export default RainAnimation;
