import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface SidebarProps {
    mode: 'dark' | 'light';
    isVisible: boolean;
    headerHeight?: number;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mode, isVisible, headerHeight, onClose }) => {
    const [localHeaderHeight, setLocalHeaderHeight] = useState(0);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!headerHeight) {
            const headerElem = document.querySelector('.app-header-container');
            if (headerElem) {
                setLocalHeaderHeight(headerElem.getBoundingClientRect().height);
            }
        }
    }, [headerHeight]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isVisible) {
                onClose();
            }
        };

        const timeoutId = setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isVisible, onClose]);

    const finalHeaderHeight = headerHeight || localHeaderHeight;

    return (
        <div className="sidebar-container" style={{ top: `${finalHeaderHeight}px` }} ref={sidebarRef}>
            <nav
                className={clsx('sidebar-menu', {
                    'dark-sidebar': mode === 'dark',
                    'light-sidebar': mode === 'light',
                    'sidebar-visible': isVisible,
                })}
            >
                <ul>
                    <li>
                        <a href="#/" className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}>
                            <span>Booking Engine:</span>
                            <span>Add Reservation</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/" className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}>
                            <span>Booking Engine:</span>
                            <span>Add Multiple Reservations</span>
                            <span className="in-progress-tag">In Progress</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/" className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}>
                            <span>Connector:</span>
                            <span>Add Reservation</span>
                            <span className="planned-tag">Planned</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/" className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}>
                            <span>Connector:</span>
                            <span>Add Multiple Reservation</span>
                            <span className="planned-tag">Planned</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/" className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}>
                            <span>Connector:</span>
                            <span>Inspect Spaces</span>
                            <span className="planned-tag">Planned</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/" className={mode === 'dark' ? 'dark-mode-text' : 'light-mode-text'}>
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
