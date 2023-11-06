import React from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

type AppHeaderProps = {
    mode: 'dark' | 'light';
    title: string;
    setTheme: (mode: 'dark' | 'light') => void;
    onToggleSidebar: () => void;
};

const AppHeader: React.FC<AppHeaderProps> = ({ mode, title, setTheme, onToggleSidebar }) => {
    const handleTitleClick = () => {
        window.location.reload();
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleTitleClick();
        }
    };

    return (
        <div className="app-header-container">
            <button className="sidebar-toggle-button" onClick={onToggleSidebar}>
                &#9776;
            </button>
            <div className="app-header-content">
                <span
                    className="app-header-title"
                    onClick={handleTitleClick}
                    onKeyPress={handleKeyPress}
                    tabIndex={0}
                    role="button"
                    style={{ cursor: 'pointer' }}
                >
                    {title}
                </span>
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
