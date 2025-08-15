import { use } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center justify-center w-10 h-10 rounded-full
        transition-all duration-300 border cursor-pointer
        ${
          theme === "light"
            ? "bg-white text-gray-700 border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50"
            : "bg-gray-800 text-white border-gray-600 shadow-sm hover:shadow-md hover:bg-gray-700"
        }
      `}
    >
      <span
        className="transition-transform duration-500 ease-in-out"
        style={{
          transform: theme === "light" ? "rotate(0deg)" : "rotate(180deg)",
        }}
      >
        {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
