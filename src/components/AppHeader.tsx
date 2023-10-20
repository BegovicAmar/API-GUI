import React from 'react';
import clsx from 'clsx';
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
            <button
                className={clsx('sidebar-toggle-button', {
                    'dark-toggle-button': mode === 'dark',
                    'light-toggle-button': mode === 'light',
                })}
                onClick={onToggleSidebar}
            >
                ☰
            </button>

            <div
                className={clsx('app-header-content', {
                    'dark-header': mode === 'dark',
                    'light-header': mode === 'light',
                })}
            >
                <span
                    className={clsx('app-header-title', {
                        'dark-mode-text': mode === 'dark',
                        'light-mode-text': mode === 'light',
                    })}
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
