import { useState, useEffect } from 'react';
import useTheme from './store/theme';

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 150, y: 80 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'system' | 'display' | 'about'>('system');
  const [systemSettings, setSystemSettings] = useState({
    soundEnabled: true,
    notificationsEnabled: true,
    autoSave: true,
    doubleClickSpeed: 'medium' as 'slow' | 'medium' | 'fast',
  });

  const currentTheme = useTheme((s) => s.currentTheme);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-content')) return;
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const handleSettingChange = (setting: keyof typeof systemSettings, value: any) => {
    setSystemSettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div
      className="fixed bg-gray-800 border-2 border-gray-600 rounded-lg shadow-2xl overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '750px',
        height: '550px',
        zIndex: 1000,
      }}
    >
      {/* Title Bar */}
      <div
        className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2 flex items-center justify-between cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
            <path d="m9 4.5 1.5 1.5M15 4.5 13.5 6m1.5 7.5-1.5 1.5m-6 0L9 13.5" />
          </svg>
          <span className="text-white font-semibold text-sm">Settings</span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs transition-colors"
        >
          ×
        </button>
      </div>

      {/* Main Content */}
      <div className="window-content flex h-full">
        {/* Sidebar */}
        <div className="w-48 bg-gray-900 border-r border-gray-700 p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('system')}
              className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                activeTab === 'system'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              ⚙️ System
            </button>
            <button
              onClick={() => setActiveTab('display')}
              className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                activeTab === 'display'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              🖥️ Display
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              ℹ️ About
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-900 overflow-auto p-6">
          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">System Preferences</h2>
                <p className="text-gray-400 text-sm mb-6">Configure system-wide settings</p>
              </div>

              {/* Sound */}
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Sound Effects</h3>
                  <p className="text-gray-400 text-sm">Play sounds for system events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.soundEnabled}
                    onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Notifications</h3>
                  <p className="text-gray-400 text-sm">Show desktop notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.notificationsEnabled}
                    onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Auto Save */}
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Auto Save</h3>
                  <p className="text-gray-400 text-sm">Automatically save file changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Double Click Speed */}
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-white font-medium mb-3">Double Click Speed</h3>
                <div className="flex gap-4">
                  {(['slow', 'medium', 'fast'] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSettingChange('doubleClickSpeed', speed)}
                      className={`px-4 py-2 rounded transition-colors capitalize ${
                        systemSettings.doubleClickSpeed === speed
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Display Tab */}
          {activeTab === 'display' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Display Settings</h2>
                <p className="text-gray-400 text-sm mb-6">Customize your desktop appearance</p>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-white font-medium mb-3">Current Theme</h3>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-lg border-2 border-gray-600" 
                    style={{ backgroundColor: currentTheme.colors.accent }}
                  />
                  <div>
                    <p className="text-white font-medium">{currentTheme.name}</p>
                    <p className="text-gray-400 text-sm">Accent: {currentTheme.colors.accent}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-white font-medium mb-3">Resolution</h3>
                <p className="text-gray-400 text-sm">
                  {window.innerWidth} × {window.innerHeight} pixels
                </p>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-white font-medium mb-3">Background</h3>
                <p className="text-gray-400 text-sm capitalize">{currentTheme.background.replace('-', ' ')}</p>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">About ReactOS</h2>
                <p className="text-gray-400 text-sm mb-6">System information</p>
              </div>

              <div className="p-6 bg-gray-800 rounded-lg space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-3xl">
                    💻
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">ReactOS</h3>
                    <p className="text-gray-400">Version 1.0.0</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">System</span>
                    <span className="text-white">React 18 + TypeScript</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Browser</span>
                    <span className="text-white">{navigator.userAgent.split(' ').pop()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Platform</span>
                    <span className="text-white">{navigator.platform}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">RAM Available</span>
                    <span className="text-white">
                      {(navigator as any).deviceMemory || 'Unknown'} GB
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">CPU Threads</span>
                    <span className="text-white">{navigator.hardwareConcurrency || 'Unknown'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-gray-400 text-xs text-center">
                    © 2024 ReactOS. Built with React, TypeScript, and Tailwind CSS.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
