import { useTheme } from "@/states/theme/ThemeContext";
import { MoonIcon, SunIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  name?: string;
};

export const ThemeButton: FC<Props> = ({}) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (): void => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <>
      <button
        id="brightnessToggle"
        onClick={toggleTheme}
        className="p-2 rounded-lg border border-white/30 bg-[#1F2937] hover:bg-[#374151] dark:bg-[#1F2937] dark:hover:bg-[#374151] text-white transition duration-300 flex items-center justify-center"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </>
  );
};
