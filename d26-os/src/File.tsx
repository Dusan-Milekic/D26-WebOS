import { useState, useEffect, useRef } from 'react';

export default function File({ name = "My File.txt" }: { name?: string }) {
  const [isSelected, setIsSelected] = useState(false);
  const fileRef = useRef<HTMLDivElement>(null);

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
      className={`inline-flex max-w-22 flex-col items-center gap-2 p-2 hover:bg-blue-300 hover:bg-opacity-10 rounded cursor-pointer ${isSelected ? 'border border-blue-400' : ''}`}
    >
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 48 48" 
        fill="none"
      >
        <rect x="12" y="8" width="24" height="32" rx="2" fill="white" stroke="#60A5FA" strokeWidth="2"/>
        <rect x="12" y="8" width="24" height="8" fill="#3B82F6"/>
        <line x1="16" y1="22" x2="32" y2="22" stroke="#1F2937" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="26" x2="32" y2="26" stroke="#1F2937" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="30" x2="28" y2="30" stroke="#1F2937" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span className="text-xs text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" contentEditable={isSelected}>
        {name}
      </span>
    </div>
  );
}