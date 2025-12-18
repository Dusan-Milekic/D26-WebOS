import { useState, useEffect, useRef } from 'react';
import useFiles from './store/files';

interface FileProps {
  id: string;
  name?: string;
  onFolderOpen?: (folderId: string, folderName: string) => void;
  onFileOpen?: (fileId: string, fileName: string) => void;
}

export default function File({ id, name: initialName = "My File.txt", onFolderOpen, onFileOpen }: FileProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [name, setName] = useState(initialName);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isRenaming, setIsRenaming] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const fileRef = useRef<HTMLDivElement>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLSpanElement>(null);
  
  const files = useFiles((s) => s.files);
  const moveFile = useFiles((s) => s.moveFile);
  const updateFile = useFiles((s) => s.updateFile);
  const removeFile = useFiles((s) => s.removeFile);
  
  const currentFile = files.find(f => f.id === id);
  const isFolder = currentFile?.type === 'folder' || name.endsWith('.dir');

  const SaveEdit = (e: React.FormEvent<HTMLSpanElement>) => {
    const newName = e.currentTarget.textContent || "";
    setName(newName);
    if (currentFile) {
      updateFile({ ...currentFile, name: newName });
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newName = e.currentTarget.textContent || "";
      setName(newName);
      setIsRenaming(false);
      if (currentFile) {
        updateFile({ ...currentFile, name: newName });
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsRenaming(false);
      if (inputRef.current) {
        inputRef.current.textContent = name;
      }
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('fileId', id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isFolder) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (isFolder) {
      const draggedFileId = e.dataTransfer.getData('fileId');
      if (draggedFileId && draggedFileId !== id) {
        moveFile(draggedFileId, id);
      }
    }
  };

  // Context menu handler
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSelected(true);
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      removeFile(id);
    }
    setContextMenu(null);
  };

  const handleRename = () => {
    setIsRenaming(true);
    setContextMenu(null);
    setTimeout(() => {
      if (inputRef.current) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(inputRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 0);
  };

  const handleProperties = () => {
    alert(`File: ${name}\nType: ${currentFile?.type}\nModified: ${new Date(currentFile?.dateModified || 0).toLocaleString()}`);
    setContextMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fileRef.current && !fileRef.current.contains(event.target as Node)) {
        setIsSelected(false);
        setIsRenaming(false);
        setContextMenu(null);
      }
    };

    const handleGlobalClick = () => {
      setContextMenu(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Handle double-click on folders
  const handleClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      if (clickCount === 0) {
        // Single click - select
        setIsSelected(true);
      } else if (clickCount === 1) {
        // Double click
        if (isFolder && onFolderOpen) {
          // Open folder
          onFolderOpen(id, name);
        } else if ((currentFile?.type === 'txt' || name.endsWith('.txt')) && onFileOpen) {
          // Open txt file in editor
          onFileOpen(id, name);
        }
      }
      setClickCount(0);
    }, 250);
  };

  return (
    <>
      <div
        ref={fileRef}
        draggable={!isSelected && !isRenaming}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className={`inline-flex max-w-22 flex-col items-center gap-2 p-2 hover:bg-blue-300 hover:bg-opacity-10 rounded cursor-pointer transition-all ${
          isSelected ? 'bg-blue-400 bg-opacity-20 border border-blue-400' : ''
        } ${isDragging ? 'opacity-50' : ''} ${isDragOver ? 'bg-blue-500 bg-opacity-30 border-2 border-blue-400' : ''}`}
      >
        {name.endsWith('.txt') && (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="12" y="8" width="24" height="32" rx="2" fill="white" stroke="#60A5FA" strokeWidth="2" />
            <rect x="12" y="8" width="24" height="8" fill="#3B82F6" />
            <line x1="16" y1="22" x2="32" y2="22" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="26" x2="32" y2="26" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="30" x2="28" y2="30" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {
          name.endsWith('.dir') && (<svg 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M6 12C6 10.8954 6.89543 10 8 10H20L24 14H40C41.1046 14 42 14.8954 42 16V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V12Z" 
                fill="#FBBF24" 
                stroke="#D97706" 
                strokeWidth="2"
                strokeLinejoin="round"
              />
  </svg>)
        }

        <span
          ref={inputRef}
          className="text-xs text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center max-w-full break-words px-1"
          contentEditable={isRenaming}
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
          onBlur={SaveEdit}
        >
          {name}
        </span>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-gray-800 border border-gray-600 rounded-lg shadow-2xl py-1 z-[9999] min-w-[180px]"
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleRename}
            className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            ✏️ Rename
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            🗑️ Delete
          </button>
          <div className="h-px bg-gray-600 my-1" />
          <button
            onClick={handleProperties}
            className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            ℹ️ Properties
          </button>
        </div>
      )}
    </>
  );
}
