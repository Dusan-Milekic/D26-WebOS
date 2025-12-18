import { useEffect, useState } from "react";
import ShowSystem from "./ShowSystem";
import Settings from "./Settings";
import useFiles from "./store/files";
import { nanoid } from "nanoid";
import Personalize from "./Personalize";

type MousePosition = {
  x: number;
  y: number;
};

type Props = {
  mousePosition?: MousePosition;
  onClose?: () => void;
};

export default function PopupRightClick({ mousePosition, onClose }: Props) {
  if (!mousePosition) return null;

  const [showSystem, setShowSystem] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [menuPos, setMenuPos] = useState<MousePosition>(mousePosition);

  const addFile = useFiles((s) => s.addFile);
  const [showPersonalize, setShowPersonalize] = useState(false);

  useEffect(() => {
    const menuWidth = 220;
    const menuHeight = 220;

    const { innerWidth, innerHeight } = window;

    let x = mousePosition.x;
    let y = mousePosition.y;

    if (x + menuWidth > innerWidth) x = innerWidth - menuWidth - 8;
    if (y + menuHeight > innerHeight) y = innerHeight - menuHeight - 8;

    setMenuPos({ x, y });
  }, [mousePosition]);

  const createTxt = () => {
    addFile({
      id: nanoid(),
      name: "New File.txt",
      type: "txt",
      dateModified: Date.now(),
      content: "",
    });

    onClose?.();
  };

  const createFolder = () => {
    addFile({
      id: nanoid(),
      name: "My Folder.dir",
      type: "folder",
      dateModified: Date.now(),
    });

    onClose?.();
  };

  const openSystemPanel = () => {
    setShowSystem(true);
    onClose?.();
  };

  const openSettings = () => {
    setShowSettings(true);
    onClose?.();
  };

  const refreshDesktop = () => {
    window.location.reload();
    onClose?.();
  };

  return (
    <>
      <div
        style={{
          top: menuPos.y,
          left: menuPos.x,
        }}
        className="
          fixed
          z-50
          min-w-[220px]
          rounded-md
          border
          border-zinc-700
          bg-zinc-900/95
          backdrop-blur-sm
          py-1
          shadow-2xl
          text-sm
          text-zinc-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="select-none">
          <li
            className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
            onClick={createFolder}
          >
            📁 Create new folder
          </li>

          <li
            className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
            onClick={createTxt}
          >
            📄 Create .txt file
          </li>

          <li className="my-1 h-px bg-zinc-700" />

          <li
            className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
            onClick={refreshDesktop}
          >
            🔄 Refresh
          </li>

          <li className="my-1 h-px bg-zinc-700" />

          <li
            className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
            onClick={setShowPersonalize.bind(null, true)}
          >
            🎨 Personalize
          </li>

          <li
            className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
            onClick={openSettings}
          >
            ⚙️ Settings
          </li>

          <li className="my-1 h-px bg-zinc-700" />

          <li
            className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
            onClick={openSystemPanel}
          >
            💻 Show System
          </li>
        </ul>
      </div>

      {showSystem && <ShowSystem />}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      {showPersonalize && <Personalize onClose={() => setShowPersonalize(false)} />}
    </>
  );
}
