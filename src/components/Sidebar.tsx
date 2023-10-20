import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

interface SidebarProps {
    mode: 'dark' | 'light';
    isVisible: boolean;
    headerHeight?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ mode, isVisible, headerHeight: propHeaderHeight }) => {
    const [localHeaderHeight, setLocalHeaderHeight] = useState(0);

    useEffect(() => {
        if (!propHeaderHeight) {
            const headerElem = document.querySelector('.app-header-container') as HTMLElement | null;
            if (headerElem) {
                setLocalHeaderHeight(headerElem.offsetHeight);
            }
        }
    }, [propHeaderHeight]);

    const finalHeaderHeight = propHeaderHeight || localHeaderHeight;

    return (
        <div className="sidebar-container" style={{ top: `${finalHeaderHeight}px` }}>
            <nav
                className={clsx('sidebar-menu', {
                    'dark-sidebar': mode === 'dark',
                    'light-sidebar': mode === 'light',
                    'sidebar-visible': isVisible,
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
