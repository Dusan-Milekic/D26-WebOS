import { useSpring, animated } from "@react-spring/web";

export default function BootBios() {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 400 },
  });

  return (
    <animated.div style={fade} className="bios-screen">
      <p>American Megatrends</p>
      <p>Initializing USB Controllers...</p>
      <p>Loading Bootloader...</p>
    </animated.div>
  );
}
