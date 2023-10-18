import React, { useEffect } from 'react';
import clsx from 'clsx';

interface SidebarProps {
    mode: 'dark' | 'light';
}

const Sidebar: React.FC<SidebarProps> = ({ mode }) => {
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
        <div className="sidebar-container">
            <button className="sidebar-toggle-button">☰</button>
            <nav
                className={clsx('sidebar-menu', {
                    'dark-sidebar': mode === 'dark',
                    'light-sidebar': mode === 'light',
                })}
            >
                <ul>
                    <li>
                        <a href="#BEAddReservation" className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}>
                            <span>Booking Engine:</span>
                            <span>Add Reservation</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#BEAddMultipleReservations"
                            className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}
                        >
                            <span>Booking Engine:</span>
                            <span>Add Multiple Reservations</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
