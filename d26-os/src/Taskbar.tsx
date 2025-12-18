import { useSpring, animated } from "@react-spring/web";
import useTheme from "./store/theme";

interface TaskbarWindow {
  id: string;
  name: string;
  type: 'folder' | 'file';
}

interface TaskbarProps {
  onStartClick: (e: React.MouseEvent) => void;
  openWindows?: TaskbarWindow[];
  activeWindow?: string | null;
  onWindowClick?: (id: string, type: 'folder' | 'file') => void;
}

export default function Taskbar({
  onStartClick,
  openWindows = [],
  activeWindow,
  onWindowClick,
}: TaskbarProps) {
  const animation = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 170, friction: 20 },
  });

  const currentTheme = useTheme((s) => s.currentTheme);
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <animated.div
      style={animation}
      className="
        fixed bottom-0 left-0 w-full h-12 
        bg-zinc-900/70 backdrop-blur-md 
        border-t border-zinc-700/40 
        flex items-center px-4 gap-3
        z-[9998]
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
          backgroundColor: currentTheme.colors.accent + '40',
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

      {/* Separator */}
      <div className="w-px h-6 bg-zinc-700" />

      {/* Open Windows */}
      <div className="flex gap-2 flex-1 overflow-x-auto">
        {openWindows.map((window) => {
          const isActive = activeWindow === `${window.type}-${window.id}`;
          return (
            <button
              key={`${window.type}-${window.id}`}
              onClick={() => onWindowClick?.(window.id, window.type)}
              className={`
                px-3 py-1 rounded-md text-sm flex items-center gap-2 
                transition-all min-w-[120px] max-w-[200px]
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              <span>{window.type === 'folder' ? '📁' : '📄'}</span>
              <span className="truncate">{window.name}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3">
        {/* Network Icon */}
        <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
        </div>

        {/* Volume Icon */}
        <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-zinc-700" />

        {/* Clock */}
        <div className="text-gray-300 text-sm font-medium min-w-[60px] text-center">
          {currentTime}
        </div>
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
