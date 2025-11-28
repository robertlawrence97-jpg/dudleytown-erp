import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';

// Auth Pages
import Login from './pages/auth/Login';
import Unauthorized from './pages/auth/Unauthorized';

// Dashboard
import Dashboard from './pages/Dashboard';

// Sales Module
import CompaniesList from './pages/sales/CompaniesList';
import CompanyDetail from './pages/sales/CompanyDetail';
import SalesOrdersList from './pages/sales/SalesOrdersList';
import SalesOrderDetail from './pages/sales/SalesOrderDetail';
import InvoicesList from './pages/sales/InvoicesList';
import InvoiceDetail from './pages/sales/InvoiceDetail';

// Management Dashboard
import ManagementDashboard from './pages/management/ManagementDashboard';

// Settings
import Settings from './pages/settings/Settings';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#f5f5f5',
      dark: '#cccccc',
    },
    secondary: {
      main: '#ff4444',
      light: '#ff6666',
      dark: '#cc0000',
    },
    background: {
      default: '#000000',
      paper: '#e0e0e0',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    divider: '#2a2a2a',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          borderBottom: '1px solid #2a2a2a',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000',
          borderRight: '1px solid #2a2a2a',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#e0e0e0',
          borderRadius: 4,
          border: '1px solid #2a2a2a',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 4,
        },
        contained: {
          backgroundColor: '#ffffff',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&.Mui-selected': {
            backgroundColor: '#1a1a1a',
            borderLeft: '3px solid #ffffff',
            '&:hover': {
              backgroundColor: '#222222',
            },
          },
          '&:hover': {
            backgroundColor: '#1a1a1a',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#ffffff',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes with Layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Sales Module (Sales + Admin) */}
            <Route path="/sales/companies" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <Layout>
                  <CompaniesList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/sales/companies/:id" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <Layout>
                  <CompanyDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/sales/orders" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <Layout>
                  <SalesOrdersList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/sales/orders/:id" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <Layout>
                  <SalesOrderDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/sales/invoices" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <Layout>
                  <InvoicesList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/sales/invoices/:id" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <Layout>
                  <InvoiceDetail />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Management Dashboard (Admin only) */}
            <Route path="/management" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <ManagementDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Settings (Admin only) */}
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
