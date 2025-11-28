import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  ShoppingCart as ShoppingCartIcon,
  Receipt as ReceiptIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  Description as DescriptionIcon,
  Factory as FactoryIcon,
  Science as ScienceIcon,
  BubbleChart as BubbleChartIcon,
  Assignment as AssignmentIcon,
  Build as BuildIcon,
  Biotech as BiotechIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 260;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // Collapse states
  const [salesOpen, setSalesOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [productionOpen, setProductionOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    handleMenuClose();
    navigate('/login');
  };

  const isSelected = (path: string) => location.pathname === path;

  const drawer = (
    <div>
      <Toolbar sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
          The Crypt
        </Typography>
      </Toolbar>
      
      <List>
        {/* Dashboard */}
        <ListItemButton
          selected={isSelected('/')}
          onClick={() => navigate('/')}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Sales Section */}
        {(user?.role === 'sales' || user?.role === 'admin') && (
          <>
            <ListItemButton onClick={() => setSalesOpen(!salesOpen)}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Sales" />
              {salesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={salesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/sales/companies')}
                  onClick={() => navigate('/sales/companies')}
                >
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Companies" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/sales/orders')}
                  onClick={() => navigate('/sales/orders')}
                >
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sales Orders" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/sales/invoices')}
                  onClick={() => navigate('/sales/invoices')}
                >
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Invoices" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        )}

        {/* Inventory Section */}
        <ListItemButton onClick={() => setInventoryOpen(!inventoryOpen)}>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
          {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={isSelected('/inventory')}
              onClick={() => navigate('/inventory')}
            >
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Items" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={isSelected('/inventory/allocations')}
              onClick={() => navigate('/inventory/allocations')}
            >
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Allocations" />
            </ListItemButton>
            {(user?.role === 'production' || user?.role === 'admin') && (
              <>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/inventory/suppliers')}
                  onClick={() => navigate('/inventory/suppliers')}
                >
                  <ListItemIcon>
                    <LocalShippingIcon />
                  </ListItemIcon>
                  <ListItemText primary="Suppliers" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/inventory/purchase-orders')}
                  onClick={() => navigate('/inventory/purchase-orders')}
                >
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Purchase Orders" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/inventory/receipts')}
                  onClick={() => navigate('/inventory/receipts')}
                >
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Receipts" />
                </ListItemButton>
              </>
            )}
          </List>
        </Collapse>

        {/* Production Section */}
        {(user?.role === 'production' || user?.role === 'admin') && (
          <>
            <ListItemButton onClick={() => setProductionOpen(!productionOpen)}>
              <ListItemIcon>
                <FactoryIcon />
              </ListItemIcon>
              <ListItemText primary="Production" />
              {productionOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={productionOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/production/products')}
                  onClick={() => navigate('/production/products')}
                >
                  <ListItemIcon>
                    <ScienceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/production/recipes')}
                  onClick={() => navigate('/production/recipes')}
                >
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Recipes" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/production/batches')}
                  onClick={() => navigate('/production/batches')}
                >
                  <ListItemIcon>
                    <BubbleChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Batches" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/production/tasks')}
                  onClick={() => navigate('/production/tasks')}
                >
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tasks" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/production/equipment')}
                  onClick={() => navigate('/production/equipment')}
                >
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText primary="Equipment" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={isSelected('/production/yeast')}
                  onClick={() => navigate('/production/yeast')}
                >
                  <ListItemIcon>
                    <BiotechIcon />
                  </ListItemIcon>
                  <ListItemText primary="Yeast" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Forecasting */}
            <ListItemButton
              selected={isSelected('/forecasting')}
              onClick={() => navigate('/forecasting')}
            >
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Forecasting" />
            </ListItemButton>
          </>
        )}

        {/* Reports */}
        {user?.role === 'admin' && (
          <ListItemButton
            selected={isSelected('/reports')}
            onClick={() => navigate('/reports')}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        )}

        <Divider sx={{ my: 1 }} />

        {/* Settings */}
        {user?.role === 'admin' && (
          <ListItemButton
            selected={isSelected('/settings')}
            onClick={() => navigate('/settings')}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        )}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {/* Page title can be added here */}
          </Typography>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {user?.displayName?.charAt(0) || 'U'}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              <Typography variant="body2">{user?.email}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
