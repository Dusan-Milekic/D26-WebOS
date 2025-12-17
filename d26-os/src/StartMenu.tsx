import { useSpring, animated } from "@react-spring/web";
import useTheme from "./store/theme";

export default function StartMenu() {
  const animation = useSpring({
    from: { opacity: 0, y: 20, scale: 0.97 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: { tension: 200, friction: 18 }
  });

  const currentTheme = useTheme((s) => s.currentTheme);

  return (
    <animated.div
      style={animation}
      className="
        start-menu
        fixed bottom-14 left-4
        w-72 h-96
        bg-zinc-900/80 backdrop-blur-xl
        border border-zinc-700/40
        rounded-xl shadow-2xl
        p-4 text-white
        z-50
      "
    >
      <p className="text-lg font-semibold mb-3">Start Menu</p>

      <div className="grid grid-cols-3 gap-3">
        <div 
          className="app-tile"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = currentTheme.colors.accent + '30';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
        >
          🗂️
        </div>
        <div 
          className="app-tile"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = currentTheme.colors.accent + '30';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
        >
          🌐
        </div>
        <div 
          className="app-tile"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = currentTheme.colors.accent + '30';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
        >
          ⚙️
        </div>
      </div>

      <style>
        {`
          .app-tile {
            width: 64px;
            height: 64px;
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            display: grid;
            place-items: center;
            cursor: pointer;
            transition: 0.2s;
            font-size: 1.5rem;
          }
          .app-tile:hover {
            transform: translateY(-3px);
          }
        `}
      </style>
    </animated.div>
  );
}
