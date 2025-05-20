import React, { useState, useMemo, useCallback } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import theme from '../theme';

const App = () => {
  const [mode, setMode] = useState('light');

  const muiTheme = useMemo(() => theme(mode), [mode]);

  const toggleMode = useCallback(() =>
    setMode(prev => (prev === 'light' ? 'dark' : 'light')), []
  );

  const router = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: <AppLayout mode={mode} toggleMode={toggleMode} />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/admin', element: <AdminDashboard /> }
      ]
    }
  ]), [mode, toggleMode]);

  return (
    <ThemeProvider theme={muiTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
