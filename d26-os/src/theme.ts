import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

export type BackgroundType = 
  | "gradient-blue"
  | "gradient-pink" 
  | "gradient-green"
  | "dark"
  | "ocean"
  | "sunset"
  | "image";

export type Theme = {
  name: string;
  colors: ThemeColors;
  background: BackgroundType;
  backgroundImage?: string;
};

type ThemeStore = {
  currentTheme: Theme;
  setBackground: (bg: BackgroundType) => void;
  setBackgroundImage: (url: string) => void;
  setAccentColor: (color: string) => void;
  applyTheme: (theme: Theme) => void;
  resetTheme: () => void;
};

const defaultTheme: Theme = {
  name: "Dark Mode",
  colors: {
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#3B82F6",
    background: "#111827",
    text: "#F9FAFB",
  },
  background: "dark",
};

const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      currentTheme: defaultTheme,

      setBackground: (bg) =>
        set((state) => ({
          currentTheme: { ...state.currentTheme, background: bg },
        })),

      setBackgroundImage: (url) =>
        set((state) => ({
          currentTheme: { 
            ...state.currentTheme, 
            background: "image",
            backgroundImage: url 
          },
        })),

      setAccentColor: (color) =>
        set((state) => ({
          currentTheme: {
            ...state.currentTheme,
            colors: { ...state.currentTheme.colors, accent: color },
          },
        })),

      applyTheme: (theme) =>
        set(() => ({
          currentTheme: theme,
        })),

      resetTheme: () =>
        set(() => ({
          currentTheme: defaultTheme,
        })),
    }),
    {
      name: "theme-storage",
    }
  )
);

export default useTheme;
