import { useState, useEffect, useRef } from 'react';

export default function File({ name: initialName = "My File.txt" }: { name?: string }) {
  const [isSelected, setIsSelected] = useState(false);
  const [name, setName] = useState(initialName);
  const fileRef = useRef<HTMLDivElement>(null);

  const SaveEdit = (e: React.FormEvent<HTMLSpanElement>) => {
    const newName = e.currentTarget.textContent || "";
    setName(newName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // stop newline
      const newName = e.currentTarget.textContent || "";
      setName(newName);
      setIsSelected(false);
      SaveEdit(e);
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

  return (
    <div
      ref={fileRef}
      onClick={() => setIsSelected(true)}
      className={`inline-flex max-w-22 flex-col items-center gap-2 p-2 hover:bg-blue-300 hover:bg-opacity-10 rounded cursor-pointer ${
        isSelected ? 'border border-blue-400' : ''
      }`}
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
              stroke-width="2"
              stroke-linejoin="round"
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