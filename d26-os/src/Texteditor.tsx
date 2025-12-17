import { useState, useEffect } from 'react';
import useFiles from './store/files';

interface TextEditorProps {
  fileId: string;
  fileName: string;
  onClose: () => void;
}

function TextEditor({ fileId, fileName, onClose }: TextEditorProps) {
  const [content, setContent] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isSaved, setIsSaved] = useState(true);

  const files = useFiles((s) => s.files);
  const updateFile = useFiles((s) => s.updateFile);

  // Load file content
  useEffect(() => {
    const file = files.find((f) => f.id === fileId);
    if (file && (file as any).content) {
      setContent((file as any).content);
    }
  }, [fileId, files]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.editor-content')) return;
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

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const handleSave = () => {
    const file = files.find((f) => f.id === fileId);
    if (file) {
      updateFile({ ...file, content } as any);
      setIsSaved(true);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+S to save
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div
      className="fixed bg-white border-2 border-gray-300 rounded-lg shadow-2xl overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '700px',
        height: '500px',
        zIndex: 1000,
      }}
    >
      {/* Title Bar */}
      <div
        className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 flex items-center justify-between cursor-move select-none border-b border-gray-300"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
            <rect x="12" y="8" width="24" height="32" rx="2" fill="white" stroke="#60A5FA" strokeWidth="2" />
            <rect x="12" y="8" width="24" height="8" fill="#3B82F6" />
            <line x1="16" y1="22" x2="32" y2="22" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="26" x2="32" y2="26" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="30" x2="28" y2="30" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-gray-800 font-semibold text-sm">
            {fileName} {!isSaved && '*'}
          </span>
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
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-300 flex items-center gap-2">
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors flex items-center gap-1"
        >
          <span>💾</span> Save
        </button>
        <span className="text-xs text-gray-500">
          {isSaved ? 'All changes saved' : 'Unsaved changes'}
        </span>
        <div className="flex-1"></div>
        <span className="text-xs text-gray-500">
          Press Ctrl+S to save
        </span>
      </div>

      {/* Editor Content */}
      <div className="editor-content h-full bg-white p-0 overflow-hidden">
        <textarea
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-4 font-mono text-sm text-gray-800 resize-none focus:outline-none"
          placeholder="Start typing..."
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export default TextEditor;
