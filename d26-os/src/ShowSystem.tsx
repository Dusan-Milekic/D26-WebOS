// ShowSystem.tsx
import { useEffect, useState } from "react";

export default function ShowSystem() {
  const [gpu, setGpu] = useState("Unknown");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

      if (!gl) return;

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const gpuName =
        debugInfo && gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

      if (gpuName) setGpu(gpuName);
    } catch {
      setGpu("Unavailable");
    }
  }, []);

  const ram = (navigator as any).deviceMemory || "Unknown";
  const cpuThreads = navigator.hardwareConcurrency || "Unknown";

  return (
    <div
      className="
        fixed bottom-16 left-4
        w-80 p-5
        bg-zinc-900/90 backdrop-blur-xl
        border border-zinc-700/40
        rounded-xl shadow-2xl
        text-white z-40
        space-y-4
      "
    >
      <h2 className="text-xl font-semibold">System Overview</h2>

      {/* CPU */}
      <div className="flex items-center gap-3">
        <svg
          className="w-10 h-10 text-zinc-300"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="9"
            y="9"
            width="6"
            height="6"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {[3, 7, 11, 15].map((y) => (
            <line
              key={`l-${y}`}
              x1="2"
              x2="4"
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          ))}
          {[3, 7, 11, 15].map((y) => (
            <line
              key={`r-${y}`}
              x1="20"
              x2="22"
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div>
          <p className="font-semibold">CPU Threads</p>
          <p className="text-sm text-zinc-400">{cpuThreads}</p>
        </div>
      </div>

      {/* RAM */}
      <div className="flex items-center gap-3">
        <svg
          className="w-10 h-10 text-zinc-300"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="3"
            y="7"
            width="18"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {[6, 10, 14, 18].map((x) => (
            <rect
              key={x}
              x={x - 1}
              y="9"
              width="2"
              height="6"
              rx="0.5"
              fill="currentColor"
            />
          ))}
        </svg>
        <div>
          <p className="font-semibold">RAM</p>
          <p className="text-sm text-zinc-400">{ram} GB (approx)</p>
        </div>
      </div>

      {/* GPU */}
      <div className="flex items-center gap-3">
        <svg
          className="w-10 h-10 text-zinc-300"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="4"
            y="6"
            width="16"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="12"
            cy="12"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7 17L9 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M17 7L15 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div>
          <p className="font-semibold">GPU</p>
          <p className="text-sm text-zinc-400 break-all">{gpu}</p>
        </div>
      </div>
    </div>
  );
}