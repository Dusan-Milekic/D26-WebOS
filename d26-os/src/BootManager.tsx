import { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import BootBios from "./boot/BootBios";
import BootLogo from "./boot/BootLogo";

export default function BootManager({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<"bios" | "logo" | "done">("bios");

  // Stage timing
  useEffect(() => {
    const t1 = setTimeout(() => setStage("logo"), 1200); // BIOS → Logo
    const t2 = setTimeout(() => setStage("done"), 4200); // Logo → Desktop
    const t3 = setTimeout(() => onFinish(), 4800);       // Remove overlay

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  // React‑Spring transition
  const transitions = useTransition(stage, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 120, friction: 20 },
  });

  return transitions((style, item) =>
    item !== "done" ? (
      <animated.div className="boot-overlay" style={style}>
        {item === "bios" && <BootBios />}
        {item === "logo" && <BootLogo />}
      </animated.div>
    ) : null
  );
}