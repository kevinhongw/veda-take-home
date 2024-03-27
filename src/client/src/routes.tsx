import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);
