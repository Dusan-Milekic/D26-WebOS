import useFiles from "./store/files";
import { nanoid } from "nanoid";

type MousePosition = {
  x: number;
  y: number;
};

type Props = {
  mousePosition?: MousePosition;
  onClose?: () => void;
};

export default function PopupRightClick({
  mousePosition,
  onClose,
}: Props) {
  if (!mousePosition) return null;


  const addFile = useFiles((s) => s.addFile);

  const createTxt = () => {
    addFile({
      id: nanoid(),
      name: "New File.txt",
      type: "txt",
      dateModified: Date.now(),
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
  }

  return (
    <div
      style={{
        top: mousePosition.y,
        left: mousePosition.x,
      }}
      className="
        fixed
        z-50
        min-w-[200px]
        rounded-md
        border
        border-zinc-700
        bg-zinc-900
        py-1
        shadow-2xl
        text-sm
        text-zinc-200
      "
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="select-none">
        <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer" onClick={createFolder}>
          Create new folder
        </li>

        <li
          className="px-4 py-2 hover:bg-zinc-800 cursor-pointer"
          onClick={createTxt}
        >
          Create .txt file
        </li>

        <li className="my-1 h-px bg-zinc-700" />

        <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
          Show Properties
        </li>

        <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
          Personalize
        </li>
      </ul>
    </div>
  );
}
