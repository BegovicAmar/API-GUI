import React from 'react';
import clsx from 'clsx';

interface SidebarProps {
    mode: 'dark' | 'light';
}

const Sidebar: React.FC<SidebarProps> = ({ mode }) => {
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
