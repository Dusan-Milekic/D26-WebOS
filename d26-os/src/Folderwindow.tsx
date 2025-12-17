import { useState } from 'react';
import useFiles from './store/files';

interface FolderWindowProps {
  folderId: string;
  folderName: string;
  onClose: () => void;
}

function FolderWindow({ folderId, folderName, onClose }: FolderWindowProps) {
  const files = useFiles((s) => s.files);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Get files inside this folder
  const folderFiles = files.filter((file) => file.parent === folderId);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-content')) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

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

  useState(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });

  return (
    <div
      className="fixed bg-gray-800 border-2 border-gray-600 rounded-lg shadow-2xl overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '600px',
        height: '400px',
        zIndex: 1000,
      }}
    >
      {/* Title Bar */}
      <div
        className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex items-center justify-between cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
            <path
              d="M6 12C6 10.8954 6.89543 10 8 10H20L24 14H40C41.1046 14 42 14.8954 42 16V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V12Z"
              fill="#FCD34D"
              stroke="#F59E0B"
              strokeWidth="2"
            />
          </svg>
          <span className="text-white font-semibold text-sm">{folderName}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-700 px-4 py-2 border-b border-gray-600 flex items-center gap-4">
        <button className="text-gray-300 hover:text-white text-xs flex items-center gap-1">
          <span>◀</span> Back
        </button>
        <button className="text-gray-300 hover:text-white text-xs flex items-center gap-1">
          <span>▶</span> Forward
        </button>
        <div className="flex-1 bg-gray-800 rounded px-3 py-1 text-gray-300 text-xs">
          📁 {folderName}
        </div>
      </div>

      {/* Content Area */}
      <div className="window-content bg-gray-900 h-full overflow-auto p-4">
        {folderFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg width="64" height="64" viewBox="0 0 48 48" fill="none" className="mb-4 opacity-50">
              <path
                d="M6 12C6 10.8954 6.89543 10 8 10H20L24 14H40C41.1046 14 42 14.8954 42 16V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V12Z"
                fill="#374151"
                stroke="#4B5563"
                strokeWidth="2"
              />
            </svg>
            <p className="text-sm">This folder is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {folderFiles.map((file) => (
              <div
                key={file.id}
                className="flex flex-col items-center gap-2 p-3 hover:bg-gray-800 rounded cursor-pointer transition-colors"
              >
                {/* File Icon */}
                {file.type === 'txt' || file.name.endsWith('.txt') ? (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="12" y="8" width="24" height="32" rx="2" fill="white" stroke="#60A5FA" strokeWidth="2" />
                    <rect x="12" y="8" width="24" height="8" fill="#3B82F6" />
                    <line x1="16" y1="22" x2="32" y2="22" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                    <line x1="16" y1="26" x2="32" y2="26" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                    <line x1="16" y1="30" x2="28" y2="30" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : file.type === 'image' ? (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="8" width="32" height="32" rx="2" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2" />
                    <circle cx="18" cy="18" r="4" fill="#FCD34D" />
                    <path d="M8 32 L16 24 L24 32 L32 24 L40 32 L40 40 L8 40 Z" fill="#5B21B6" />
                  </svg>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="12" y="8" width="24" height="32" rx="2" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
                    <line x1="16" y1="18" x2="32" y2="18" stroke="#6B7280" strokeWidth="2" />
                    <line x1="16" y1="24" x2="32" y2="24" stroke="#6B7280" strokeWidth="2" />
                    <line x1="16" y1="30" x2="26" y2="30" stroke="#6B7280" strokeWidth="2" />
                  </svg>
                )}
                <span className="text-xs text-white text-center break-all">{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FolderWindow;