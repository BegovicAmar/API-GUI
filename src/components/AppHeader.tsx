import React, { useEffect } from 'react';
import clsx from 'clsx';

type AppHeaderProps = {
    mode: 'dark' | 'light'; // You can pass the theme mode as a prop
    title: string; // App title or brand name
};

const AppHeader: React.FC<AppHeaderProps> = ({ mode, title }) => {
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
                <span className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}>{title}</span>
            </div>
        </div>
    );
};

export default AppHeader;
