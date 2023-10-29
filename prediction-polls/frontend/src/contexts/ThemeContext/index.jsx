import React, { useEffect, useState, createContext } from 'react';
import '../../theme/colors.css';

export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme || 'light'; 
    });

    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme + '-theme';
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
