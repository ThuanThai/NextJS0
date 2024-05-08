import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UsersPage from './screens/users.page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello world!</div>,
    },
    {
        path: '/users',
        element: <UsersPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
