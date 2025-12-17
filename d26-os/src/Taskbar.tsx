import { useSpring, animated } from "@react-spring/web";
import useTheme from "./store/theme";

export default function Taskbar({
  onStartClick,
}: {
  onStartClick: () => void;
}) {
  const animation = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 170, friction: 20 },
  });

  const currentTheme = useTheme((s) => s.currentTheme);

  return (
    <animated.div
      style={animation}
      className="
        fixed bottom-0 left-0 w-full h-12 
        bg-zinc-900/70 backdrop-blur-md 
        border-t border-zinc-700/40 
        flex items-center px-4 gap-3
      "
    >
      {/* Start button with accent color */}
      <div
        onClick={onStartClick}
        className="
          w-8 h-8 rounded-md grid place-items-center 
          text-white cursor-pointer transition-all
          hover:scale-110
        "
        style={{
          backgroundColor: currentTheme.colors.accent + '40', // 40 = 25% opacity
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = currentTheme.colors.accent + '60';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = currentTheme.colors.accent + '40';
        }}
      >
        ⊞
      </div>

      {/* Pinned apps */}
      <div className="flex gap-2">
        <div className="taskbar-icon">🗂️</div>
        <div className="taskbar-icon">🌐</div>
        <div className="taskbar-icon">⚙️</div>
      </div>

      <style>
        {`
          .taskbar-icon {
            width: 32px;
            height: 32px;
            background: rgba(255,255,255,0.05);
            border-radius: 6px;
            display: grid;
            place-items: center;
            cursor: pointer;
            transition: 0.2s;
          }
          .taskbar-icon:hover {
            background: ${currentTheme.colors.accent}40;
            transform: translateY(-2px);
          }
        `}
      </style>
    </animated.div>
  );
}
