import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UsersPage from './screens/users.page';
import './App.css';
import LayoutAdmin from './components/layout/admin.layout';
import TrackPage from './screens/track.page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutAdmin></LayoutAdmin>,
        children: [
            { index: true, element: <div>Hello From Homepage</div> },
            { path: 'users', element: <UsersPage /> },
            { path: 'tracks', element: <TrackPage></TrackPage> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
