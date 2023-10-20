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

        window.addEventListener('resize', adjustSidebarPosition);

        return () => {
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
                            <span className="in-progress-tag">In Progress</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#ConnectorAddReservation"
                            className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}
                        >
                            <span>Connector:</span>
                            <span>Add Reservation</span>
                            <span className="planned-tag">Planned</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#ConnectorAddMultipleReservation"
                            className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}
                        >
                            <span>Connector:</span>
                            <span>Add Multiple Reservation</span>
                            <span className="planned-tag">Planned</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#ConnectorInspectSpaces"
                            className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}
                        >
                            <span>Connector:</span>
                            <span>Inspect Spaces</span>
                            <span className="planned-tag">Planned</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#ConnectorCleanReservations"
                            className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}
                        >
                            <span>Connector:</span>
                            <span>Clean Reservations</span>
                            <span className="planned-tag">Planned</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
