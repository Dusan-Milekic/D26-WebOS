import { useSpring, animated } from "@react-spring/web";
import "../animation.css";

export default function BootLogo() {
  // Fade-in for the logo
  const logoSpring = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 120, friction: 20 },
  });

  // Windows-style spinning loader
  const spinnerSpring = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    config: { duration: 1200 },
  });

  return (
    <div className="winboot-container">
      {/* Windows Logo */}
      <animated.div style={logoSpring} className="winboot-logo">
        <div className="win-square sq1" />
        <div className="win-square sq2" />
        <div className="win-square sq3" />
        <div className="win-square sq4" />
      </animated.div>

      {/* Spinner */}
      <animated.div
        className="winboot-spinner"
        style={{
          transform: spinnerSpring.rotate.to((r) => `rotate(${r}deg)`),
        }}
      >
        <div className="dot d1" />
        <div className="dot d2" />
        <div className="dot d3" />
        <div className="dot d4" />
        <div className="dot d5" />
        <div className="dot d6" />
      </animated.div>

      <p className="boot-loading-text text-white mt-6">Starting ReactOS...</p>
    </div>
  );
}
