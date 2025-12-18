import { useSpring, animated } from "@react-spring/web";
import useTheme from "./store/theme";
import ShowPortfolio from "./ShowPortfolio";
import Settings from "./Settings";
import { useState } from "react";

export default function StartMenu() {
  const animation = useSpring({
    from: { opacity: 0, y: 20, scale: 0.97 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: { tension: 200, friction: 18 }
  });

  const currentTheme = useTheme((s) => s.currentTheme);
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <>
      <animated.div
        style={animation}
        onClick={(e) => e.stopPropagation()}
        className="
          start-menu
          fixed bottom-14 left-4
          w-80 h-[450px]
          bg-zinc-900/90 backdrop-blur-xl
          border border-zinc-700/40
          rounded-xl shadow-2xl
          text-white
          z-[999]
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <p className="text-sm font-semibold">User</p>
              <p className="text-xs text-gray-400">ReactOS</p>
            </div>
          </div>
        </div>

        {/* Pinned Apps Section */}
        <div className="p-4">
          <p className="text-xs text-gray-400 mb-3 font-semibold">Pinned</p>
          
          <div className="grid grid-cols-4 gap-3">
            <div
              className="app-tile"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = currentTheme.colors.accent + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              title="File Explorer"
            >
              🗂️
              <span className="text-[10px] mt-1">Files</span>
            </div>

            <div
              className="app-tile"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = currentTheme.colors.accent + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onClick={() => setPortfolioVisible(true)}
              title="Portfolio"
            >
              🌐
              <span className="text-[10px] mt-1">Web</span>
            </div>

            <div
              className="app-tile"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = currentTheme.colors.accent + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onClick={() => setSettingsVisible(true)}
              title="Settings"
            >
              ⚙️
              <span className="text-[10px] mt-1">Settings</span>
            </div>

            <div
              className="app-tile"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = currentTheme.colors.accent + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              title="Terminal"
            >
              💻
              <span className="text-[10px] mt-1">Terminal</span>
            </div>

            <div
              className="app-tile"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = currentTheme.colors.accent + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              title="Calculator"
            >
              🔢
              <span className="text-[10px] mt-1">Calc</span>
            </div>

            <div
              className="app-tile"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = currentTheme.colors.accent + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              title="Text Editor"
            >
              📝
              <span className="text-[10px] mt-1">Editor</span>
            </div>

            <div
              className="app-tile"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = currentTheme.colors.accent + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              title="Photos"
            >
              🖼️
              <span className="text-[10px] mt-1">Photos</span>
            </div>

            <div
              className="app-tile"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = currentTheme.colors.accent + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              title="Music"
            >
              🎵
              <span className="text-[10px] mt-1">Music</span>
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-400 mb-3 font-semibold">Recommended</p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center">
                📄
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">Document.txt</p>
                <p className="text-[10px] text-gray-500">Recently opened</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-purple-600/20 rounded flex items-center justify-center">
                📁
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">Projects</p>
                <p className="text-[10px] text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-700/50 p-3 bg-zinc-900/50">
          <button 
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-zinc-800 rounded-lg transition-colors text-sm"
            onClick={() => window.confirm('Shutdown ReactOS?') && console.log('Shutting down...')}
          >
            <span className="text-red-400">⏻</span>
            <span>Power</span>
          </button>
        </div>
      </animated.div>

      {portfolioVisible && (
        <ShowPortfolio onClose={() => setPortfolioVisible(false)} />
      )}
      
      {settingsVisible && (
        <Settings onClose={() => setSettingsVisible(false)} />
      )}

      <style>
        {`
          .app-tile {
            aspect-square;
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: 0.2s;
            font-size: 1.5rem;
          }
          .app-tile:hover {
            transform: translateY(-3px);
          }
        `}
      </style>
    </>
  );
}
