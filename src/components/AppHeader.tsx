import React, { useEffect } from 'react';
import clsx from 'clsx';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

type AppHeaderProps = {
    mode: 'dark' | 'light';
    title: string;
    setTheme: (mode: 'dark' | 'light') => void; // Add this prop
};

const AppHeader: React.FC<AppHeaderProps> = ({ mode, title, setTheme }) => {
    useEffect(() => {
        const sidebarToggleButton = document.querySelector('.sidebar-toggle-button') as HTMLElement;
        const sidebarMenu = document.querySelector('.sidebar-menu') as HTMLElement;

        const handleToggle = () => {
            if (sidebarMenu.style.left === '-250px' || sidebarMenu.style.left === '') {
                sidebarMenu.style.left = '0px';
            } else {
                sidebarMenu.style.left = '-250px';
            }
        };

        if (sidebarToggleButton && sidebarMenu) {
            sidebarToggleButton.addEventListener('click', handleToggle);
        }

        return () => {
            if (sidebarToggleButton) {
                sidebarToggleButton.removeEventListener('click', handleToggle);
            }
        };
    }, []);

    return (
        <div className="app-header-container">
            <button className="sidebar-toggle-button">☰</button>
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
