import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

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
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
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
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Sales Module (Sales + Admin) */}
            <Route path="/sales/companies" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <CompaniesList />
              </ProtectedRoute>
            } />
            <Route path="/sales/companies/:id" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <CompanyDetail />
              </ProtectedRoute>
            } />
            <Route path="/sales/orders" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <SalesOrdersList />
              </ProtectedRoute>
            } />
            <Route path="/sales/orders/:id" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <SalesOrderDetail />
              </ProtectedRoute>
            } />
            <Route path="/sales/invoices" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <InvoicesList />
              </ProtectedRoute>
            } />
            <Route path="/sales/invoices/:id" element={
              <ProtectedRoute allowedRoles={['sales', 'admin']}>
                <InvoiceDetail />
              </ProtectedRoute>
            } />
            
            {/* Management Dashboard (Admin only) */}
            <Route path="/management" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManagementDashboard />
              </ProtectedRoute>
            } />
            
            {/* Settings (Admin only) */}
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Settings />
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