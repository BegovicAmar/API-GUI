import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './providers/ThemeProvider';

import { createHashRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/cr/:enterpriseId',
        element: <App />,
    },
]);

root.render(
    <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
