import React, { createContext, useState } from 'react';
import { Mode } from '@anatoliygatt/dark-mode-toggle';

interface ThemeContextProps {
    value: Mode;
    setTheme: (value: Mode) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    value: 'dark',
    setTheme: () => null,
});
ThemeContext.displayName = 'ThemeContext';

interface ThemeProviderProps {
    children: React.ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<Mode>(() => (window.localStorage.getItem('themeMode') as Mode) || 'dark');

    const setTheme = (value: Mode) => {
        window.localStorage.setItem('themeMode', value);
        setMode(value);
    };
    return <ThemeContext.Provider value={{ value: mode, setTheme }}>{children}</ThemeContext.Provider>;
};
