import { useState, useEffect } from 'react';
import useTheme from './store/theme';
import type { BackgroundType, Theme } from './store/theme';

interface PersonalizeProps {
  onClose: () => void;
}

export default function Personalize({ onClose }: PersonalizeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 100 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'background' | 'colors' | 'themes'>('background');

  const currentTheme = useTheme((s) => s.currentTheme);
  const setBackground = useTheme((s) => s.setBackground);
  const setAccentColor = useTheme((s) => s.setAccentColor);
  const applyTheme = useTheme((s) => s.applyTheme);
  const resetTheme = useTheme((s) => s.resetTheme);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-content')) return;
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

  const backgrounds = [
    { name: 'Gradient Blue', type: 'gradient-blue' as BackgroundType, color: 'from-blue-500 to-purple-600' },
    { name: 'Gradient Pink', type: 'gradient-pink' as BackgroundType, color: 'from-pink-500 to-orange-500' },
    { name: 'Gradient Green', type: 'gradient-green' as BackgroundType, color: 'from-green-500 to-teal-500' },
    { name: 'Dark', type: 'dark' as BackgroundType, color: 'from-gray-900 to-gray-800' },
    { name: 'Ocean', type: 'ocean' as BackgroundType, color: 'from-blue-600 to-cyan-500' },
    { name: 'Sunset', type: 'sunset' as BackgroundType, color: 'from-red-500 to-yellow-500' },
  ];

  const accentColors = [
    '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444',
    '#F59E0B', '#10B981', '#06B6D4', '#6366F1',
    '#14B8A6', '#84CC16', '#F97316', '#A855F7',
    '#22C55E', '#0EA5E9', '#F43F5E', '#64748B',
  ];

  const themePresets: Theme[] = [
    {
      name: 'Dark Mode',
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#3B82F6',
        background: '#111827',
        text: '#F9FAFB',
      },
      background: 'dark',
    },
    {
      name: 'Ocean Blue',
      colors: {
        primary: '#0EA5E9',
        secondary: '#06B6D4',
        accent: '#0EA5E9',
        background: '#0C4A6E',
        text: '#F0F9FF',
      },
      background: 'ocean',
    },
    {
      name: 'Purple Dream',
      colors: {
        primary: '#8B5CF6',
        secondary: '#A855F7',
        accent: '#8B5CF6',
        background: '#581C87',
        text: '#FAF5FF',
      },
      background: 'gradient-blue',
    },
    {
      name: 'Sunset Glow',
      colors: {
        primary: '#F59E0B',
        secondary: '#EF4444',
        accent: '#F59E0B',
        background: '#7C2D12',
        text: '#FFF7ED',
      },
      background: 'sunset',
    },
    {
      name: 'Forest Green',
      colors: {
        primary: '#10B981',
        secondary: '#84CC16',
        accent: '#10B981',
        background: '#14532D',
        text: '#F0FDF4',
      },
      background: 'gradient-green',
    },
  ];

  return (
    <div
      className="fixed bg-gray-800 border-2 border-gray-600 rounded-lg shadow-2xl overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '800px',
        height: '600px',
        zIndex: 1000,
      }}
    >
      {/* Title Bar */}
      <div
        className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 flex items-center justify-between cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
            <path d="m9 4.5 1.5 1.5M15 4.5 13.5 6m1.5 7.5-1.5 1.5m-6 0L9 13.5" />
          </svg>
          <span className="text-white font-semibold text-sm">Personalization</span>
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
              onClick={() => setActiveTab('background')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeTab === 'background'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              🖼️ Background
            </button>
            <button
              onClick={() => setActiveTab('colors')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeTab === 'colors'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              🎨 Colors
            </button>
            <button
              onClick={() => setActiveTab('themes')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeTab === 'themes'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              ✨ Themes
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-900 overflow-auto">
          {/* Background Tab */}
          {activeTab === 'background' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Background Settings</h2>
              <p className="text-gray-400 mb-6">Choose a background for your desktop</p>
              
              <div className="grid grid-cols-3 gap-4">
                {backgrounds.map((bg, index) => (
                  <div
                    key={index}
                    onClick={() => setBackground(bg.type)}
                    className={`cursor-pointer transition-all ${
                      currentTheme.background === bg.type 
                        ? 'ring-4 ring-purple-500' 
                        : ''
                    }`}
                  >
                    <div className="aspect-video rounded-lg border-2 border-gray-700 hover:border-purple-500 transition-all overflow-hidden group">
                      <div className={`w-full h-full bg-gradient-to-br ${bg.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-2">{bg.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Accent Colors</h2>
              <p className="text-gray-400 mb-6">Choose your accent color</p>
              
              <div className="grid grid-cols-8 gap-3">
                {accentColors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setAccentColor(color)}
                    className={`aspect-square rounded-lg border-2 cursor-pointer transition-all hover:scale-110 ${
                      currentTheme.colors.accent === color
                        ? 'border-white ring-2 ring-offset-2 ring-offset-gray-900 ring-white'
                        : 'border-gray-700 hover:border-white'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-3">Custom Color</h3>
                <div className="flex gap-4 items-center">
                  <input
                    type="color"
                    value={currentTheme.colors.accent}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-20 h-20 rounded cursor-pointer border-2 border-gray-700"
                  />
                  <div className="text-gray-400 text-sm">
                    <p>Pick any color you like</p>
                    <p className="text-xs text-gray-500">Current: {currentTheme.colors.accent}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Themes Tab */}
          {activeTab === 'themes' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Theme Presets</h2>
              <p className="text-gray-400 mb-6">Apply a complete theme</p>
              
              <div className="space-y-4">
                {themePresets.map((theme, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-lg bg-gray-800 border cursor-pointer transition-all ${
                      currentTheme.name === theme.name
                        ? 'border-purple-500 ring-2 ring-purple-500'
                        : 'border-gray-700 hover:border-purple-500'
                    }`}
                    onClick={() => applyTheme(theme)}
                  >
                    <div className="flex gap-2">
                      <div 
                        className="w-12 h-12 rounded border border-gray-600" 
                        style={{ backgroundColor: theme.colors.background }}
                      />
                      <div 
                        className="w-12 h-12 rounded" 
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{theme.name}</h3>
                      <p className="text-sm text-gray-400">Complete theme preset</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        applyTheme(theme);
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors text-sm"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-6 py-3 flex justify-between items-center">
        <p className="text-xs text-gray-500">Changes are applied instantly</p>
        <div className="flex gap-2">
          <button 
            onClick={resetTheme}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-sm"
          >
            Reset to Default
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}