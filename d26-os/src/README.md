# ReactOS - Desktop Operating System UI

Modern desktop operating system interface built with React, TypeScript, and Tailwind CSS. Features a complete windowing system, file management, theming, and more.

## 🚀 Features

### Core Functionality
- ✅ **Complete Boot Sequence** - BIOS screen → Windows-style boot animation
- ✅ **Desktop Environment** - Full desktop with drag-and-drop file system
- ✅ **Window Management** - Draggable, resizable, maximizable windows
- ✅ **File System** - Create, rename, delete files and folders
- ✅ **Folder Windows** - Browse folders with nested file support
- ✅ **Text Editor** - Full-featured text editor with auto-save
- ✅ **Context Menus** - Right-click menus for files and desktop
- ✅ **Start Menu** - Application launcher with pinned apps
- ✅ **Taskbar** - Open window management with system tray
- ✅ **Settings Panel** - System preferences and configuration
- ✅ **Personalization** - Theme customization with preset themes
- ✅ **System Info** - Display hardware information

### Advanced Features
- **Drag and Drop** - Move files between folders and desktop
- **Multiple Windows** - Open multiple folders and files simultaneously
- **Window Focus** - Click to focus, proper z-index management
- **Theming System** - Multiple gradient backgrounds and accent colors
- **Persistent Storage** - Uses Zustand with localStorage
- **Responsive Design** - Works on different screen sizes
- **Smooth Animations** - React Spring animations throughout

## 📦 Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd reactos

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Spring** - Animations
- **nanoid** - Unique ID generation

## 📁 Project Structure

```
src/
├── App.tsx                 # Main application component
├── boot/
│   ├── BootBios.tsx       # BIOS boot screen
│   ├── BootLogo.tsx       # Windows-style boot animation
│   └── BootManager.tsx    # Boot sequence orchestrator
├── File.tsx               # Desktop file/folder component
├── FolderWindow.tsx       # Folder browser window
├── TextEditor.tsx         # Text file editor
├── Taskbar.tsx            # Bottom taskbar with window management
├── StartMenu.tsx          # Application launcher
├── PopupRightClick.tsx    # Context menu
├── Settings.tsx           # System settings panel
├── Personalize.tsx        # Theme customization
├── ShowSystem.tsx         # System information panel
├── ShowPortfolio.tsx      # Portfolio window
├── store/
│   ├── files.ts           # File system state management
│   └── theme.ts           # Theme state management
├── App.css                # Main styles
├── animation.css          # Boot animation styles
└── index.css              # Global styles
```

## 🎨 Usage Guide

### Creating Files and Folders
1. **Right-click on desktop** → Select "Create new folder" or "Create .txt file"
2. **Inside folder windows** → Click "+ New File" or "+ New Folder" buttons
3. **Files are automatically saved** to localStorage

### Managing Files
- **Rename**: Right-click file → Select "Rename" → Type new name → Press Enter
- **Delete**: Right-click file → Select "Delete" → Confirm
- **Move**: Drag file onto a folder to move it inside
- **Open**: Double-click file to open (folders open folder window, .txt files open editor)

### Working with Windows
- **Move**: Click and drag title bar
- **Maximize**: Click □ button in title bar
- **Minimize**: Click − button (placeholder for taskbar minimize)
- **Close**: Click × button in title bar
- **Focus**: Click anywhere on window to bring to front

### Customizing Appearance
1. **Right-click desktop** → Select "Personalize"
2. Choose from:
   - **Background**: Different gradient styles
   - **Colors**: Accent color picker
   - **Themes**: Complete pre-made themes

### System Settings
1. **Right-click desktop** → Select "Settings" OR click Settings in Start Menu
2. Configure:
   - **System**: Sound, notifications, auto-save
   - **Display**: View current theme and resolution
   - **About**: System information

### Start Menu
1. **Click ⊞ button** in taskbar (bottom-left)
2. Access:
   - Pinned applications
   - Recently opened files
   - Settings and power options

## 🔧 Configuration

### Adding New File Types
Edit `src/store/files.ts`:

```typescript
export type FileItem = {
  id: string;
  name: string;
  type: "folder" | "txt" | "image" | "pdf" | "other"; // Add your type here
  dateModified: number;
  parent?: string | null;
  content?: string;
};
```

### Adding New Themes
Edit `src/Personalize.tsx`:

```typescript
const themePresets: Theme[] = [
  {
    name: 'Your Theme Name',
    colors: {
      primary: '#color',
      secondary: '#color',
      accent: '#color',
      background: '#color',
      text: '#color',
    },
    background: 'gradient-blue', // or any BackgroundType
  },
  // ... more themes
];
```

### Customizing Boot Sequence
Edit `src/BootManager.tsx` to change timing:

```typescript
const t1 = setTimeout(() => setStage("logo"), 1200); // BIOS duration
const t2 = setTimeout(() => setStage("done"), 4200); // Logo duration
```

## 🎯 Development Roadmap

### Implemented ✅
- [x] Boot sequence
- [x] Desktop environment
- [x] File and folder creation
- [x] Drag and drop
- [x] Window management
- [x] Text editor
- [x] Settings panel
- [x] Personalization
- [x] Taskbar with window buttons
- [x] Context menus
- [x] File operations (rename, delete)

### Future Enhancements 🔮
- [ ] Search functionality
- [ ] Calculator app
- [ ] Image viewer
- [ ] Terminal emulator
- [ ] File upload from local system
- [ ] Multiple desktop workspaces
- [ ] Window snapping (like Windows Snap)
- [ ] Keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)
- [ ] Trash/Recycle bin
- [ ] Undo/Redo operations
- [ ] File compression/extraction
- [ ] Network connectivity simulation
- [ ] Multi-language support

## 🐛 Known Issues

1. **Drag performance**: Large numbers of files may slow down dragging
2. **Mobile support**: Best viewed on desktop/laptop screens
3. **File persistence**: Files only persist in browser localStorage

## 💡 Tips for Juniors

This project demonstrates several important concepts:

1. **State Management**: Using Zustand for global state (files, theme)
2. **Component Composition**: Breaking UI into reusable components
3. **Event Handling**: Mouse events, keyboard shortcuts, drag and drop
4. **Persistent Storage**: Using localStorage via Zustand persist
5. **CSS-in-JS**: Dynamic styling based on theme
6. **Animations**: React Spring for smooth transitions
7. **TypeScript**: Type safety and better developer experience

### Learning Path
1. Start by understanding `File.tsx` - basic component
2. Move to `FolderWindow.tsx` - window management
3. Study `store/files.ts` - state management patterns
4. Explore `App.tsx` - application architecture
5. Dive into animations with `BootManager.tsx`

## 📝 License

This project is open source and available for portfolio use.

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🙏 Acknowledgments

- Inspired by Windows OS interface
- Built as a learning project for React and TypeScript
- Perfect for junior developer portfolios

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**
