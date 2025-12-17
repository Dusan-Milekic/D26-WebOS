import React, { useState } from "react";
import "./App.css";
import File from "./File";
import PopupRightClick from "./PopupRightClick";
import useFiles from "./store/files";
import BootManager from "./BootManager";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";

function App() {
  const [bootDone, setBootDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [startOpen, setStartOpen] = useState(false);

  const files = useFiles((s) => s.files);

  const openPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {!bootDone && <BootManager onFinish={() => setBootDone(true)} />}

      {bootDone && (
        <div
          id="desktop"
          onContextMenu={openPopup}
          className="w-screen h-screen relative"
        >
          {files.map((file) => (
            <File key={file.id} name={file.name} />
          ))}

          {/* ✅ Start Menu */}
          {startOpen && <StartMenu />}

          {/* ✅ Taskbar with Start button handler */}
          <Taskbar onStartClick={() => setStartOpen((prev) => !prev)} />
        </div>
      )}

      {isOpen && (
        <>
          <PopupRightClick mousePosition={mousePosition} />
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </>
  );
}

export default App;