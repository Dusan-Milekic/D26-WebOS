# ReactOS - Best Practices & Development Guidelines

Vodič za održavanje kvalitetnog koda tokom razvoja projekta.

## 🏗️ Arhitektura Projekta

### Folder Struktura
```
src/
├── components/          # Reusable UI components
│   ├── windows/        # Window-related components
│   ├── desktop/        # Desktop-specific components
│   └── common/         # Shared components (Button, Input, etc.)
├── store/              # Zustand stores
│   ├── files.ts
│   ├── theme.ts
│   └── settings.ts
├── hooks/              # Custom React hooks
│   ├── useWindowManager.ts
│   ├── useFileSystem.ts
│   └── useKeyboardShortcuts.ts
├── types/              # TypeScript type definitions
│   ├── file.types.ts
│   └── window.types.ts
├── utils/              # Helper functions
│   ├── fileHelpers.ts
│   └── dateHelpers.ts
├── constants/          # App constants
│   └── config.ts
└── App.tsx
```

## 📝 Code Style Guidelines

### TypeScript Best Practices

#### 1. Koristi Type umesto Interface gde je moguće
```typescript
// ✅ DOBRO - za simple types
type FileType = 'folder' | 'txt' | 'image';

// ✅ DOBRO - za objects koji se neće extend-ovati
type FileItem = {
  id: string;
  name: string;
  type: FileType;
};

// ✅ DOBRO - za objects koji će se extend-ovati
interface WindowProps {
  title: string;
  onClose: () => void;
}

interface DraggableWindowProps extends WindowProps {
  onDrag: (x: number, y: number) => void;
}
```

#### 2. Definiši Return Type za funkcije
```typescript
// ❌ LOŠE
function getFileName(id: string) {
  return files.find(f => f.id === id)?.name;
}

// ✅ DOBRO
function getFileName(id: string): string | undefined {
  return files.find(f => f.id === id)?.name;
}
```

#### 3. Koristi Strict Mode
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### React Best Practices

#### 1. Koristi Functional Components
```typescript
// ✅ DOBRO
function FileComponent({ id, name }: FileProps) {
  return <div>{name}</div>;
}

// ❌ IZBEGAVAJ class components
```

#### 2. Custom Hooks za Logic
```typescript
// ✅ DOBRO - Izdvoji logic u custom hook
function useWindowDrag(initialPosition: Position) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    // ... drag logic
  };

  return { position, isDragging, handleMouseDown };
}

// Koristi u komponenti
function Window() {
  const { position, isDragging, handleMouseDown } = useWindowDrag({ x: 0, y: 0 });
  // ...
}
```

#### 3. Memoization za Performance
```typescript
// ✅ DOBRO - memo za expensive components
const FileList = memo(({ files }: FileListProps) => {
  return (
    <div>
      {files.map(file => <File key={file.id} {...file} />)}
    </div>
  );
});

// ✅ DOBRO - useMemo za expensive calculations
const sortedFiles = useMemo(() => {
  return files.sort((a, b) => a.name.localeCompare(b.name));
}, [files]);

// ✅ DOBRO - useCallback za funkcije u dependencies
const handleFileClick = useCallback((id: string) => {
  openFile(id);
}, [openFile]);
```

### State Management Best Practices

#### 1. Zustand Store Organization
```typescript
// ✅ DOBRO - Odvojeni store za svaku domenu
// files.ts
const useFiles = create<FileStore>((set) => ({
  files: [],
  addFile: (file) => set((state) => ({ 
    files: [...state.files, file] 
  })),
}));

// theme.ts
const useTheme = create<ThemeStore>((set) => ({
  currentTheme: defaultTheme,
  setTheme: (theme) => set({ currentTheme: theme }),
}));
```

#### 2. Computed Values sa Selectors
```typescript
// ✅ DOBRO - Koristi selectors
const rootFiles = useFiles((state) => 
  state.files.filter(f => !f.parent)
);

// ❌ LOŠE - Calculate u komponenti
const files = useFiles((state) => state.files);
const rootFiles = files.filter(f => !f.parent); // svaki render
```

#### 3. Batch Updates
```typescript
// ✅ DOBRO - Batch multiple updates
set((state) => ({
  files: newFiles,
  selectedFile: null,
  isLoading: false,
}));

// ❌ LOŠE - Multiple separate updates
set({ files: newFiles });
set({ selectedFile: null });
set({ isLoading: false });
```

## 🎨 Component Design

### 1. Props Interface na vrhu
```typescript
interface FileProps {
  id: string;
  name: string;
  onOpen?: (id: string) => void;
  className?: string;
}

function File({ id, name, onOpen, className }: FileProps) {
  // ...
}
```

### 2. Default Props
```typescript
// ✅ DOBRO - Destructuring sa default values
function File({ 
  name = "Unnamed", 
  size = 0,
  type = "unknown" 
}: FileProps) {
  // ...
}
```

### 3. Event Handlers konvencija
```typescript
// ✅ DOBRO - handle prefix za handler functions
const handleClick = () => {};
const handleDragStart = () => {};
const handleFileOpen = () => {};

// Props: on prefix
<File onClick={handleClick} onOpen={handleFileOpen} />
```

## 🔧 Performance Optimization

### 1. Lazy Loading komponenti
```typescript
// ✅ DOBRO - Lazy load heavy components
const Settings = lazy(() => import('./Settings'));
const TextEditor = lazy(() => import('./TextEditor'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      {showSettings && <Settings />}
    </Suspense>
  );
}
```

### 2. Virtual Scrolling za liste
```typescript
// Za velike liste fajlova (100+)
import { useVirtualizer } from '@tanstack/react-virtual';

function FileList({ files }: { files: FileItem[] }) {
  const virtualizer = useVirtualizer({
    count: files.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
  });

  // Render only visible items
}
```

### 3. Debounce Search/Filter
```typescript
// ✅ DOBRO - Debounce za search
const debouncedSearch = useMemo(
  () => debounce((term: string) => {
    setSearchResults(filterFiles(term));
  }, 300),
  []
);
```

## 🧪 Testing Guidelines

### 1. Test File Naming
```
Component.tsx       → Component.test.tsx
useHook.ts         → useHook.test.ts
fileHelpers.ts     → fileHelpers.test.ts
```

### 2. Test Structure
```typescript
describe('File Component', () => {
  it('should render file name', () => {
    render(<File id="1" name="test.txt" />);
    expect(screen.getByText('test.txt')).toBeInTheDocument();
  });

  it('should call onOpen when double clicked', () => {
    const onOpen = jest.fn();
    render(<File id="1" name="test.txt" onOpen={onOpen} />);
    
    fireEvent.doubleClick(screen.getByText('test.txt'));
    expect(onOpen).toHaveBeenCalledWith('1');
  });
});
```

### 3. Test Coverage
```bash
# Run tests with coverage
npm run test -- --coverage

# Aim for:
# - Statements: >80%
# - Branches: >75%
# - Functions: >80%
# - Lines: >80%
```

## 📦 Dependencies Management

### 1. Redovno Update-uj Dependencies
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Update major versions (pažljivo!)
npx npm-check-updates -u
npm install
```

### 2. Bundle Size Monitoring
```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer
```

### 3. Audit Security
```bash
# Check for vulnerabilities
npm audit

# Fix auto-fixable issues
npm audit fix
```

## 🐛 Error Handling

### 1. Try-Catch za Async Operations
```typescript
// ✅ DOBRO
async function loadFile(id: string) {
  try {
    const file = await fetchFile(id);
    setFile(file);
  } catch (error) {
    console.error('Failed to load file:', error);
    showNotification('Failed to load file', 'error');
  }
}
```

### 2. Error Boundaries
```typescript
class ErrorBoundary extends Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

// Wrap app
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### 3. User-Friendly Error Messages
```typescript
// ❌ LOŠE
throw new Error('Failed');

// ✅ DOBRO
throw new Error('Failed to save file. Please check your connection and try again.');
```

## 🔍 Debugging Tips

### 1. React DevTools
```typescript
// Dodaj displayName za better debugging
FileComponent.displayName = 'File';
```

### 2. Console Helpers
```typescript
// Development only logging
if (import.meta.env.DEV) {
  console.log('File opened:', file);
}

// Useful for debugging state changes
useEffect(() => {
  console.log('Files changed:', files);
}, [files]);
```

### 3. Performance Profiling
```typescript
// React Profiler
<Profiler id="FileList" onRender={onRenderCallback}>
  <FileList files={files} />
</Profiler>
```

## 📖 Documentation

### 1. JSDoc Comments
```typescript
/**
 * Opens a file in the appropriate editor
 * @param fileId - The unique identifier of the file
 * @param editorType - Optional editor type override
 * @returns Promise that resolves when file is opened
 * @throws {Error} If file doesn't exist
 */
async function openFile(
  fileId: string, 
  editorType?: EditorType
): Promise<void> {
  // implementation
}
```

### 2. README za svaki Major Feature
```
features/
├── text-editor/
│   ├── TextEditor.tsx
│   ├── README.md         # Kako radi text editor
│   └── types.ts
```

## 🔐 Security Best Practices

### 1. Sanitize User Input
```typescript
// ✅ DOBRO - Sanitize file names
function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .substring(0, 255);
}
```

### 2. Validate Data
```typescript
// ✅ DOBRO - Validate before save
function saveFile(file: FileItem) {
  if (!file.name || file.name.trim() === '') {
    throw new Error('File name is required');
  }
  if (file.name.length > 255) {
    throw new Error('File name too long');
  }
  // save...
}
```

## 🚀 Git Workflow

### Commit Messages
```bash
# Format: type(scope): description

feat(files): add file compression feature
fix(window): resolve drag issue on Firefox
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(store): optimize file store selectors
test(files): add unit tests for file operations
chore(deps): update dependencies
```

### Branch Naming
```bash
feature/file-compression
bugfix/window-drag-firefox
hotfix/critical-crash
refactor/state-management
```

## 💡 Pro Tips

1. **Code Review**: Uvek pregledaj svoj kod pre commit-a
2. **Small Commits**: Radije više malih nego jedan veliki commit
3. **Write Tests**: Piši test za svaki novi feature
4. **Document Decisions**: Piši komentare za complex logic
5. **Refactor Often**: Ne čekaj da kod postane unmaintainable
6. **Learn Patterns**: Proučavaj React design patterns
7. **Stay Updated**: Prati React i TypeScript novosti

---

**Zapamti**: Bolji kod = lakše održavanje = brži development! 🚀
