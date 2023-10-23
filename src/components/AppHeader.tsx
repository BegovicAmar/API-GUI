import React from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

type AppHeaderProps = {
    mode: 'dark' | 'light';
    title: string;
    setTheme: (mode: 'dark' | 'light') => void;
    onToggleSidebar: () => void;
};
const AppHeader: React.FC<AppHeaderProps> = ({ mode, title, setTheme, onToggleSidebar }) => {
    return (
        <div className="app-header-container">
            <button className="sidebar-toggle-button" onClick={onToggleSidebar}>
                ☰
            </button>
            <div className="app-header-content">
                <span className="app-header-title">{title}</span>
                <div className="dark-mode-toggle-button">
                    <DarkModeToggle
                        mode={mode}
                        dark="Dark"
                        light="Light"
                        size="sm"
                        onChange={(newMode) => {
                            setTheme(newMode);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppHeader;
