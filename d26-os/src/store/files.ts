import { create } from "zustand";
export type FileItem = {
  id: string;
  name: string;
  type: "folder" | "txt" | "image" | "other";
  dateModified: number; // timestamp (najbolja praksa)
};

type FileStore = {
  files: FileItem[];
  addFile: (file: FileItem) => void;
  removeFile: (id: FileItem["id"]) => void;
  updateFile: (file: FileItem) => void;
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
}));

export default useFiles;
