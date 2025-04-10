import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type Context = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: Context = {
  theme: "light",
  setTheme: (_theme: Theme) => null,
};

const ThemeContext = createContext<Context>(initialState);

type ThemeProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

const ThemeProvider = ({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
  ...props
}: ThemeProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
