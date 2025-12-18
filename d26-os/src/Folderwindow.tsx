import { useState, useEffect } from 'react';
import useFiles from './store/files';
import { nanoid } from 'nanoid';

interface FolderWindowProps {
  folderId: string;
  folderName: string;
  onClose: () => void;
  onFileOpen?: (fileId: string, fileName: string) => void;
}

function FolderWindow({ folderId, folderName, onClose, onFileOpen }: FolderWindowProps) {
  const files = useFiles((s) => s.files);
  const addFile = useFiles((s) => s.addFile);
  const removeFile = useFiles((s) => s.removeFile);
  const updateFile = useFiles((s) => s.updateFile);
  const moveFile = useFiles((s) => s.moveFile);
  
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 700, height: 500 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number, fileId?: string } | null>(null);
  
  // Get files inside this folder
  const folderFiles = files.filter((file) => file.parent === folderId);

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
      if (isDragging && !isMaximized) {
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
  }, [isDragging, dragStart, isMaximized]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleMinimize = () => {
    // Could implement minimize to taskbar
    console.log('Minimize clicked');
  };

  // Drag and drop handlers for window
  const handleWindowDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleWindowDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const draggedFileId = e.dataTransfer.getData('fileId');
    if (draggedFileId) {
      moveFile(draggedFileId, folderId);
    }
  };

  const handleFileClick = (fileId: string) => {
    setSelectedFile(fileId);
  };

  const handleFileDoubleClick = (file: any) => {
    if (file.type === 'txt' && onFileOpen) {
      onFileOpen(file.id, file.name);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, fileId?: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, fileId });
    if (fileId) {
      setSelectedFile(fileId);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file && window.confirm(`Are you sure you want to delete "${file.name}"?`)) {
      removeFile(fileId);
    }
    setContextMenu(null);
  };

  const handleCreateFile = () => {
    addFile({
      id: nanoid(),
      name: "New File.txt",
      type: "txt",
      dateModified: Date.now(),
      parent: folderId,
      content: "",
    });
    setContextMenu(null);
  };

  const handleCreateFolder = () => {
    addFile({
      id: nanoid(),
      name: "New Folder.dir",
      type: "folder",
      dateModified: Date.now(),
      parent: folderId,
    });
    setContextMenu(null);
  };

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const windowStyle = isMaximized
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 48px)' }
    : { left: `${position.x}px`, top: `${position.y}px`, width: `${size.width}px`, height: `${size.height}px` };

  return (
    <>
      <div
        className="fixed bg-gray-800 border-2 border-gray-600 rounded-lg shadow-2xl overflow-hidden transition-all duration-200"
        style={{
          ...windowStyle,
          zIndex: 1000,
        }}
        onDragOver={handleWindowDragOver}
        onDrop={handleWindowDrop}
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
              onClick={handleMinimize}
              className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center text-white font-bold text-xs transition-colors"
            >
              −
            </button>
            <button
              onClick={handleMaximize}
              className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center text-white font-bold text-xs transition-colors"
            >
              {isMaximized ? '❐' : '□'}
            </button>
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
          <button className="text-gray-300 hover:text-white text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-600 transition-colors">
            <span>◀</span> Back
          </button>
          <button className="text-gray-300 hover:text-white text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-600 transition-colors">
            <span>▶</span> Forward
          </button>
          <div className="flex-1 bg-gray-800 rounded px-3 py-1 text-gray-300 text-xs flex items-center gap-2">
            📁 {folderName}
          </div>
          <button
            onClick={handleCreateFile}
            className="text-gray-300 hover:text-white text-xs px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            + New File
          </button>
          <button
            onClick={handleCreateFolder}
            className="text-gray-300 hover:text-white text-xs px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            + New Folder
          </button>
        </div>

        {/* Content Area */}
        <div 
          className="window-content bg-gray-900 h-full overflow-auto p-4"
          onContextMenu={(e) => handleContextMenu(e)}
        >
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
              <p className="text-xs text-gray-600 mt-2">Drag files here or use the toolbar to create new items</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {folderFiles.map((file) => (
                <div
                  key={file.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('fileId', file.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onClick={() => handleFileClick(file.id)}
                  onDoubleClick={() => handleFileDoubleClick(file)}
                  onContextMenu={(e) => handleContextMenu(e, file.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded cursor-pointer transition-all ${
                    selectedFile === file.id 
                      ? 'bg-blue-600 bg-opacity-40 border-2 border-blue-400' 
                      : 'hover:bg-gray-800'
                  }`}
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
                  ) : file.type === 'folder' || file.name.endsWith('.dir') ? (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path
                        d="M6 12C6 10.8954 6.89543 10 8 10H20L24 14H40C41.1046 14 42 14.8954 42 16V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V12Z"
                        fill="#FBBF24"
                        stroke="#D97706"
                        strokeWidth="2"
                      />
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
                  <span className="text-xs text-white text-center break-all line-clamp-2">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-gray-800 border border-gray-600 rounded-lg shadow-2xl py-1 z-[9999] min-w-[180px]"
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.fileId ? (
            <>
              <button
                onClick={() => {
                  const file = files.find(f => f.id === contextMenu.fileId);
                  if (file?.type === 'txt' && onFileOpen) {
                    onFileOpen(file.id, file.name);
                  }
                  setContextMenu(null);
                }}
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 transition-colors"
              >
                📖 Open
              </button>
              <div className="h-px bg-gray-600 my-1" />
              <button
                onClick={() => contextMenu.fileId && handleDeleteFile(contextMenu.fileId)}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 transition-colors"
              >
                🗑️ Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCreateFile}
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 transition-colors"
              >
                📄 New File
              </button>
              <button
                onClick={handleCreateFolder}
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 transition-colors"
              >
                📁 New Folder
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default FolderWindow;
