import React, { createContext, useCallback, useMemo, useState } from 'react';
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

    const setTheme = useCallback((value: Mode) => {
        window.localStorage.setItem('themeMode', value);
        setMode(value);
    }, []);

    const contextValue = useMemo(() => ({ value: mode, setTheme }), [mode, setTheme]);

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
