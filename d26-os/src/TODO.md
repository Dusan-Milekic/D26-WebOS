# ReactOS - TODO List

Ova lista sadrži ideje za dalje unapređenje projekta. Odlično za praksu i učenje novih koncepata!

## 🔥 Prioritet - Lako za implementaciju

### Keyboard Shortcuts
- [ ] **Ctrl + C** - Copy file
- [ ] **Ctrl + V** - Paste file  
- [ ] **Ctrl + X** - Cut file
- [ ] **Delete** - Delete selected file
- [ ] **F2** - Rename selected file
- [ ] **Ctrl + N** - New file
- [ ] **Ctrl + Shift + N** - New folder
- [ ] **Ctrl + A** - Select all files
- [ ] **Escape** - Deselect all

### Trash/Recycle Bin
- [ ] Desktop Recycle Bin icon
- [ ] Move deleted files to trash instead of removing
- [ ] "Empty Recycle Bin" option
- [ ] "Restore" files from trash
- [ ] Show item count on trash icon

### File Operations
- [ ] **Copy/Paste** - Clipboard functionality
- [ ] **Cut/Paste** - Move with clipboard
- [ ] **Duplicate** - Right-click → Duplicate file
- [ ] **Select Multiple** - Ctrl+Click for multi-select
- [ ] **Select Range** - Shift+Click to select range

## 🎯 Srednji Prioritet - Malo više posla

### Calculator App
- [ ] Basic calculator window
- [ ] Number buttons (0-9)
- [ ] Operations (+, -, *, /)
- [ ] Clear and equals buttons
- [ ] Show calculation history
- [ ] Keyboard input support

### Image Viewer
- [ ] Support for .jpg, .png files
- [ ] Thumbnail preview in folders
- [ ] Full image viewer window
- [ ] Zoom in/out
- [ ] Next/Previous image buttons
- [ ] Slideshow mode

### Search Functionality
- [ ] Search bar in folder windows
- [ ] Global search (Start menu)
- [ ] Filter files by name
- [ ] Filter files by type
- [ ] Search results window

### Window Snapping
- [ ] Drag window to top → Maximize
- [ ] Drag window to left/right → Half screen
- [ ] Drag window to corners → Quarter screen
- [ ] Show snap preview
- [ ] Keyboard shortcuts (Win + Arrow keys)

## 🚀 Napredniji Features

### Terminal Emulator
- [ ] Basic command line interface
- [ ] Implement basic commands:
  - `ls` - list files
  - `cd` - change directory
  - `mkdir` - make directory
  - `rm` - remove file
  - `cat` - show file content
  - `clear` - clear terminal
  - `help` - show available commands
- [ ] Command history (up/down arrows)
- [ ] Tab completion
- [ ] Colored output

### File Upload/Download
- [ ] Upload files from computer
- [ ] Download files to computer
- [ ] Drag files from desktop into browser
- [ ] Show upload progress
- [ ] File size validation

### Notifications System
- [ ] Toast notifications
- [ ] Notification center
- [ ] App-specific notifications
- [ ] Action buttons in notifications
- [ ] Notification history

### Multiple Desktops
- [ ] Create new desktop workspaces
- [ ] Switch between desktops
- [ ] Move windows between desktops
- [ ] Desktop preview thumbnails
- [ ] Keyboard shortcuts (Ctrl + Win + Arrow)

## 🎨 UI/UX Improvements

### Animations
- [ ] Window open/close animations
- [ ] File creation animation
- [ ] Smooth file dragging
- [ ] Loading states
- [ ] Transition effects

### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] High contrast mode
- [ ] Font size adjustment
- [ ] Focus indicators

### Responsive Design
- [ ] Mobile layout
- [ ] Tablet optimizations
- [ ] Touch gestures
- [ ] Adaptive UI elements

## 💾 Data & Storage

### Advanced File System
- [ ] File/folder size display
- [ ] Sort by (name, date, size, type)
- [ ] Grid/List view toggle
- [ ] File icons by type
- [ ] Breadcrumb navigation

### Undo/Redo
- [ ] Track all file operations
- [ ] Undo last action (Ctrl+Z)
- [ ] Redo action (Ctrl+Y)
- [ ] Show undo history
- [ ] Clear undo stack

### File Compression
- [ ] Create .zip archives
- [ ] Extract .zip files
- [ ] Show compression progress
- [ ] Password protection
- [ ] Multi-file selection for zip

## 🌐 Network & Sharing

### Browser App
- [ ] Simple web browser window
- [ ] URL bar
- [ ] Back/Forward buttons
- [ ] Bookmarks
- [ ] Multiple tabs

### Cloud Storage
- [ ] Mock cloud sync
- [ ] Upload to "cloud"
- [ ] Download from "cloud"
- [ ] Sync indicator
- [ ] Offline mode

## 🎮 Fun Extras

### Games
- [ ] Minesweeper
- [ ] Solitaire
- [ ] Tic-Tac-Toe
- [ ] Snake
- [ ] Leaderboards

### Widgets
- [ ] Weather widget
- [ ] Clock widget
- [ ] Calendar widget
- [ ] Notes widget
- [ ] Music player widget

### Screensaver
- [ ] Activate after inactivity
- [ ] Multiple screensaver styles
- [ ] Settings for timing
- [ ] Preview option

## 📱 Apps to Build

1. **Notepad** - ✅ Already have TextEditor
2. **Calculator** - High priority
3. **Paint** - Simple drawing app
4. **Media Player** - Play audio files
5. **Photo Viewer** - View images
6. **Calendar** - Date picker and events
7. **Clock** - Alarm and timer
8. **Weather** - Mock weather display
9. **Mail** - Email client mockup
10. **Settings** - ✅ Already have

## 🔧 Code Quality

### Testing
- [ ] Setup Jest for unit tests
- [ ] Test file operations
- [ ] Test window management
- [ ] Test state management
- [ ] E2E tests with Playwright

### Performance
- [ ] Lazy load windows
- [ ] Virtual scrolling for large folders
- [ ] Memoize expensive calculations
- [ ] Optimize re-renders
- [ ] Bundle size optimization

### Documentation
- [ ] JSDoc comments
- [ ] Component documentation
- [ ] API documentation
- [ ] Architecture diagrams
- [ ] Video tutorials

## 💡 Pro Tips

### Kako početi?
1. **Izaberi jedan feature** iz "Lako za implementaciju"
2. **Napravi novi branch** u git-u
3. **Implementiraj feature** korak po korak
4. **Testiraj** sve edge case-ove
5. **Commit i merge** kada radi

### Učenje kroz rad
- **Calculator** → Nauči state management
- **Keyboard shortcuts** → Event handling
- **Trash bin** → Complex state updates
- **Terminal** → String parsing
- **Tests** → Testing practices

### Pitanja koja treba da postaviš sebi
- Da li komponenta radi sa edge case-ovima?
- Je li kod čitljiv i razumljiv?
- Postoje li duplikati koje mogu da izvučem?
- Da li mogu da dodam TypeScript tipove?
- Kako bi ovo uradio senior developer?

## 🎓 Learning Resources

- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Zustand**: https://github.com/pmndrs/zustand
- **React Spring**: https://www.react-spring.dev
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Napomena**: Ne moraš sve ovo da implementiraš odjednom! Izaberi feature koji te zanima, uradi ga kako treba, pa pređi na sledeći. Svaki feature je odličan za učenje! 🚀
