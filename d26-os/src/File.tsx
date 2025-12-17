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
  const fileRef = useRef<HTMLDivElement>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const files = useFiles((s) => s.files);
  const moveFile = useFiles((s) => s.moveFile);
  const updateFile = useFiles((s) => s.updateFile);
  
  const currentFile = files.find(f => f.id === id);
  const isFolder = currentFile?.type === 'folder' || name.endsWith('.dir');

  const SaveEdit = (e: React.FormEvent<HTMLSpanElement>) => {
    const newName = e.currentTarget.textContent || "";
    setName(newName);
    if (currentFile) {
      updateFile({ ...currentFile, name: newName });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newName = e.currentTarget.textContent || "";
      setName(newName);
      setIsSelected(false);
      if (currentFile) {
        updateFile({ ...currentFile, name: newName });
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fileRef.current && !fileRef.current.contains(event.target as Node)) {
        setIsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    <div
      ref={fileRef}
      draggable={!isSelected}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`inline-flex max-w-22 flex-col items-center gap-2 p-2 hover:bg-blue-300 hover:bg-opacity-10 rounded cursor-pointer transition-all ${
        isSelected ? 'border border-blue-400' : ''
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
        className="text-xs text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
        contentEditable={isSelected}
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
      >
        {name}
      </span>
    </div>
  );
}
