import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Sync initial state with localStorage or class list
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="relative w-14 h-[30px] rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none"
      style={{
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <motion.div
        className="absolute top-[3px] left-[3px] w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100"
        initial={false}
        animate={{
          x: isDark ? 26 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        {isDark ? (
          <Moon size={13} className="text-gray-800" strokeWidth={2.5} />
        ) : (
          <Sun size={13} className="text-yellow-500" strokeWidth={2.5} />
        )}
      </motion.div>
    </button>
  );
}
