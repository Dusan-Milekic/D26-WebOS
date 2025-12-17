import { create } from "zustand";

export type FileItem = {
  id: string;
  name: string;
  type: "folder" | "txt" | "image" | "other";
  dateModified: number;
  parent?: string | null; // ✅ folder relationship
  content?: string; // ✅ content for txt files
};

type FileStore = {
  files: FileItem[];
  addFile: (file: FileItem) => void;
  removeFile: (id: string) => void;
  updateFile: (file: FileItem) => void;
  moveFile: (fileId: string, folderId: string) => void; // ✅ correct signature
};

const useFiles = create<FileStore>()((set) => ({
  files: [],

  addFile: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),

  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== id),
    })),

  updateFile: (updatedFile) =>
    set((state) => ({
      files: state.files.map((f) =>
        f.id === updatedFile.id ? updatedFile : f
      ),
    })),

  // ✅ Move file into folder
  moveFile: (fileId, folderId) =>
    set((state) => ({
      files: state.files.map((f) =>
        f.id === fileId ? { ...f, parent: folderId } : f
      ),
    })),
}));

export default useFiles;
