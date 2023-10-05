import React from 'react';
import './LoaderComponent.css';

type LoaderType = 'reservation' | 'configuration';

const LoaderComponent: React.FC<{ type: LoaderType }> = ({
    type = 'reservation',
}) => {
    const messages: Record<LoaderType, string> = {
        reservation: 'Creating reservation...',
        configuration: 'Fetching configuration...',
    };

    return (
        <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-text">{messages[type]}</div>
        </div>
    );
};

export default LoaderComponent;
