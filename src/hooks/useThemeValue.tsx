import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

export const useThemeContext = () => {
    return useContext(ThemeContext);
};

export const useThemeContextValue = () => {
    return useContext(ThemeContext).value;
};
