import React, { useState } from "react";
import "./App.css";
import File from "./File";
import PopupRightClick from "./PopupRightClick";
import useFiles from "./store/files";
import BootManager from "./BootManager";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import FolderWindow from "./FolderWindow";
import TextEditor from "./TextEditor";
import useTheme from "./store/theme";

function App() {
  const [bootDone, setBootDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [startOpen, setStartOpen] = useState(false);
  const [openFolders, setOpenFolders] = useState<Array<{ id: string; name: string }>>([]);
  const [openFiles, setOpenFiles] = useState<Array<{ id: string; name: string }>>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const files = useFiles((s) => s.files);
  const currentTheme = useTheme((s) => s.currentTheme);
  
  // Filter out files that are inside folders - show only root level files
  const rootFiles = files.filter((file) => !file.parent || file.parent === null);

  const openPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleFolderOpen = (folderId: string, folderName: string) => {
    if (!openFolders.find(f => f.id === folderId)) {
      setOpenFolders([...openFolders, { id: folderId, name: folderName }]);
      setActiveWindow(`folder-${folderId}`);
    } else {
      setActiveWindow(`folder-${folderId}`);
    }
  };

  const handleFolderClose = (folderId: string) => {
    setOpenFolders(openFolders.filter(f => f.id !== folderId));
    if (activeWindow === `folder-${folderId}`) {
      setActiveWindow(null);
    }
  };

  const handleFileOpen = (fileId: string, fileName: string) => {
    if (!openFiles.find(f => f.id === fileId)) {
      setOpenFiles([...openFiles, { id: fileId, name: fileName }]);
      setActiveWindow(`file-${fileId}`);
    } else {
      setActiveWindow(`file-${fileId}`);
    }
  };

  const handleFileClose = (fileId: string) => {
    setOpenFiles(openFiles.filter(f => f.id !== fileId));
    if (activeWindow === `file-${fileId}`) {
      setActiveWindow(null);
    }
  };

  // Get background class based on theme
  const getBackgroundClass = () => {
    switch (currentTheme.background) {
      case 'gradient-blue':
        return 'bg-gradient-to-br from-blue-500 to-purple-600';
      case 'gradient-pink':
        return 'bg-gradient-to-br from-pink-500 to-orange-500';
      case 'gradient-green':
        return 'bg-gradient-to-br from-green-500 to-teal-500';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 to-gray-800';
      case 'ocean':
        return 'bg-gradient-to-br from-blue-600 to-cyan-500';
      case 'sunset':
        return 'bg-gradient-to-br from-red-500 to-yellow-500';
      case 'image':
        return 'bg-cover bg-center';
      default:
        return 'bg-gradient-to-br from-gray-900 to-gray-800';
    }
  };

  return (
    <>
      {!bootDone && <BootManager onFinish={() => setBootDone(true)} />}

      {bootDone && (
        <div
          id="desktop"
          onContextMenu={openPopup}
          onClick={() => setStartOpen(false)}
          className={`w-screen h-screen relative transition-all duration-500 ${getBackgroundClass()}`}
          style={
            currentTheme.background === 'image' && currentTheme.backgroundImage
              ? { backgroundImage: `url(${currentTheme.backgroundImage})` }
              : undefined
          }
        >
          {rootFiles.map((file) => (
            <File 
              key={file.id} 
              id={file.id} 
              name={file.name}
              onFolderOpen={handleFolderOpen}
              onFileOpen={handleFileOpen}
            />
          ))}

          {/* Render open folder windows */}
          {openFolders.map((folder) => (
            <div
              key={folder.id}
              style={{ zIndex: activeWindow === `folder-${folder.id}` ? 2000 : 1000 }}
              onClick={() => setActiveWindow(`folder-${folder.id}`)}
            >
              <FolderWindow
                folderId={folder.id}
                folderName={folder.name}
                onClose={() => handleFolderClose(folder.id)}
                onFileOpen={handleFileOpen}
              />
            </div>
          ))}

          {/* Render open text editor windows */}
          {openFiles.map((file) => (
            <div
              key={file.id}
              style={{ zIndex: activeWindow === `file-${file.id}` ? 2000 : 1000 }}
              onClick={() => setActiveWindow(`file-${file.id}`)}
            >
              <TextEditor
                fileId={file.id}
                fileName={file.name}
                onClose={() => handleFileClose(file.id)}
              />
            </div>
          ))}

          {startOpen && <StartMenu />}

          <Taskbar 
            onStartClick={(e) => {
              e.stopPropagation();
              setStartOpen((prev) => !prev);
            }} 
            openWindows={[...openFolders.map(f => ({ id: f.id, name: f.name, type: 'folder' as const })), 
                          ...openFiles.map(f => ({ id: f.id, name: f.name, type: 'file' as const }))]}
            activeWindow={activeWindow}
            onWindowClick={(id, type) => setActiveWindow(`${type}-${id}`)}
          />
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
