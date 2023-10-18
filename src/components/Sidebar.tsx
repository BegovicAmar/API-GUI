import React, { useEffect } from 'react';
import clsx from 'clsx';

interface SidebarProps {
    mode: 'dark' | 'light';
}

const Sidebar: React.FC<SidebarProps> = ({ mode }) => {
    useEffect(() => {
        const adjustSidebarPosition = () => {
            const header = document.querySelector('.app-header-container') as HTMLElement;
            const sidebar = document.querySelector('.sidebar-menu') as HTMLElement;

            if (header && sidebar) {
                const headerHeight = header.offsetHeight;
                sidebar.style.top = `${headerHeight}px`;
            }
        };

        adjustSidebarPosition();

        // Adjust position on window resize
        window.addEventListener('resize', adjustSidebarPosition);

        return () => {
            // Cleanup the event listener
            window.removeEventListener('resize', adjustSidebarPosition);
        };
    }, []);

    return (
        <div className="sidebar-container">
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
