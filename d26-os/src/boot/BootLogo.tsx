import { useSpring, animated } from "@react-spring/web";
import BootAnimation from "../BootAnimations";

export default function BootLogo() {
  const textSpring = useSpring({
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
    delay: 500,
  });

  return (
    <div className="logo-screen">
      <BootAnimation />

      <animated.p style={textSpring} className="boot-loading-text">
        Starting system...
      </animated.p>
    </div>
  );
}