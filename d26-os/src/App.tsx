import "./App.css";
import File from "./File";
import React from "react";
import PopupRightClick from "./PopupRightClick";
import useFiles from "./store/files";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const files = useFiles((s) => s.files);

  const openPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        id="desktop"
        onContextMenu={openPopup}
        className="w-screen h-screen"
      >
        {files.map((file) => (
          <File key={file.id} name={file.name} />
        ))}
      </div>

      {isOpen && (
        <>
          <PopupRightClick mousePosition={mousePosition} />

          <div
            className="fixed inset-0 z-40"
            onClick={closePopup}
          />
        </>
      )}
    </>
  );
}

export default App;
