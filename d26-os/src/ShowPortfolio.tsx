import { useRef, useState, useEffect } from "react";

export default function ShowPortfolio({ onClose }: { onClose: () => void }) {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!windowRef.current) return;

    const el = windowRef.current;
    const rect = el.getBoundingClientRect();

    el.style.left = `${rect.left}px`;
    el.style.top = `${rect.top}px`;
    el.style.transform = "none";
  }, []);

  const startDrag = (e: React.MouseEvent) => {
    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    setIsDragging(true);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const onDrag = (e: React.MouseEvent) => {
    if (!isDragging || !windowRef.current) return;

    windowRef.current.style.left = `${e.clientX - offset.x}px`;
    windowRef.current.style.top = `${e.clientY - offset.y}px`;
  };

  const stopDrag = () => setIsDragging(false);

  return (
    <div
      className="fixed inset-0 z-50"
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
    >
      <div
        ref={windowRef}
        className="
          portfolio absolute
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[520px] p-6 rounded-2xl
          bg-zinc-900/60 backdrop-blur-2xl shadow-2xl border border-white/10
          text-zinc-200 select-none
        "
      >
        {/* ✅ Title bar */}
        <div
          className="w-full h-10 flex items-center px-3 mb-4
          cursor-move bg-white/5 rounded-md"
          onMouseDown={startDrag}
        >
          <span className="text-sm text-zinc-300">Portfolio</span>

          <button
            onClick={onClose}
            className="ml-auto text-zinc-400 hover:text-zinc-200 text-lg"
          >
            ✕
          </button>
        </div>

        {/* ✅ Sadržaj */}
        <h1 className="text-3xl font-semibold tracking-wide mb-1">
          Dusan Milekic
        </h1>
        <p className="text-sm text-zinc-400 mb-6">Frontend Developer</p>

        {/* ✅ Sekcije */}
        <div className="space-y-4 mb-6">
          <div>
            <h2 className="text-sm font-medium text-zinc-300 mb-1">Trenutno učim</h2>
            <p className="text-sm text-zinc-400">
              Python, Data Science ,Machine Learning,AI
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-zinc-300 mb-1">Znam</h2>
            <p className="text-sm text-zinc-400">
              React, Laravel, JavaScript, TailwindCss,Git,SQL
            </p>
          </div>
        </div>

        {/* ✅ Linkovi sa ikonicama */}
        <div className="flex gap-4 text-lg">
          <a
            href="https://github.com/tvoj-github"
            target="_blank"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            <span>🐙</span> <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/tvoj-linkedin"
            target="_blank"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            <span>🔗</span> <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}