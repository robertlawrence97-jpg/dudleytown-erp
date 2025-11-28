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

// Inventory Module
import InventoryItemsList from './pages/inventory/InventoryItemsList';
import InventoryItemDetail from './pages/inventory/InventoryItemDetail';
import SuppliersList from './pages/inventory/SuppliersList';
import SupplierDetail from './pages/inventory/SupplierDetail';
import PurchaseOrdersList from './pages/inventory/PurchaseOrdersList';
import PurchaseOrderDetail from './pages/inventory/PurchaseOrderDetail';
import ReceiptsList from './pages/inventory/ReceiptsList';
import ReceiptDetail from './pages/inventory/ReceiptDetail';
import AllocationsView from './pages/inventory/AllocationsView';

// Production Module
import ProductsList from './pages/production/ProductsList';
import ProductDetail from './pages/production/ProductDetail';
import RecipesList from './pages/production/RecipesList';
import RecipeDetail from './pages/production/RecipeDetail';
import BatchesList from './pages/production/BatchesList';
import BatchDetail from './pages/production/BatchDetail';
import TasksList from './pages/production/TasksList';
import EquipmentList from './pages/production/EquipmentList';
import YeastManagement from './pages/production/YeastManagement';

// Forecasting Module
import ForecastingView from './pages/forecasting/ForecastingView';

// Reporting Module
import ReportsDashboard from './pages/reports/ReportsDashboard';
import COGSReport from './pages/reports/COGSReport';

// Management & Settings
import ManagementDashboard from './pages/management/ManagementDashboard';
import Settings from './pages/settings/Settings';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
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
            
            {/* Protected Routes with Layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* ========== SALES MODULE ========== */}
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
            
            {/* ========== INVENTORY MODULE ========== */}
            <Route path="/inventory" element={
              <ProtectedRoute>
                <Layout>
                  <InventoryItemsList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/inventory/items/:id" element={
              <ProtectedRoute>
                <Layout>
                  <InventoryItemDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/inventory/allocations" element={
              <ProtectedRoute>
                <Layout>
                  <AllocationsView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/inventory/suppliers" element={
              <ProtectedRoute>
                <Layout>
                  <SuppliersList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/inventory/suppliers/:id" element={
              <ProtectedRoute>
                <Layout>
                  <SupplierDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/inventory/purchase-orders" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <PurchaseOrdersList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/inventory/purchase-orders/:id" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <PurchaseOrderDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/inventory/receipts" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <ReceiptsList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/inventory/receipts/:id" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <ReceiptDetail />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* ========== PRODUCTION MODULE ========== */}
            <Route path="/production/products" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <ProductsList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/production/products/:id" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <ProductDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/production/recipes" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <RecipesList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/production/recipes/:id" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <RecipeDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/production/batches" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <BatchesList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/production/batches/:id" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <BatchDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/production/tasks" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <TasksList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/production/equipment" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <EquipmentList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/production/yeast" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <YeastManagement />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* ========== FORECASTING MODULE ========== */}
            <Route path="/forecasting" element={
              <ProtectedRoute allowedRoles={['production', 'admin']}>
                <Layout>
                  <ForecastingView />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* ========== REPORTING MODULE ========== */}
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <ReportsDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/reports/cogs" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <COGSReport />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* ========== MANAGEMENT & SETTINGS ========== */}
            <Route path="/management" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <ManagementDashboard />
                </Layout>
              </ProtectedRoute>
            } />
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
