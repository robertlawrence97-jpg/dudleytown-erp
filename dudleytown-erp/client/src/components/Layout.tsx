import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Collapse
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import ScienceIcon from '@mui/icons-material/Science';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 260;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [productionOpen, setProductionOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isSalesUser = currentUser?.role === 'sales' || currentUser?.role === 'admin';
  const isProductionUser = currentUser?.role === 'production' || currentUser?.role === 'admin';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    handleProfileMenuClose();
    await signOut();
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar sx={{ borderBottom: '1px solid #2a2a2a' }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
          The Crypt
        </Typography>
      </Toolbar>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname === '/'}
            onClick={() => navigate('/')}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Sales Module */}
        {isSalesUser && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setSalesOpen(!salesOpen)}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Sales" />
                {salesOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={salesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === '/sales/companies'}
                  onClick={() => navigate('/sales/companies')}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Companies" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === '/sales/orders'}
                  onClick={() => navigate('/sales/orders')}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === '/sales/invoices'}
                  onClick={() => navigate('/sales/invoices')}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Invoices" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        )}

        {/* Inventory Module */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setInventoryOpen(!inventoryOpen)}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
            {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={location.pathname === '/inventory'}
              onClick={() => navigate('/inventory')}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Items" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={location.pathname === '/inventory/suppliers'}
              onClick={() => navigate('/inventory/suppliers')}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Suppliers" />
            </ListItemButton>
            {isProductionUser && (
              <>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === '/inventory/purchase-orders'}
                  onClick={() => navigate('/inventory/purchase-orders')}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Purchase Orders" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={location.pathname === '/inventory/receipts'}
                  onClick={() => navigate('/inventory/receipts')}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Receipts" />
                </ListItemButton>
              </>
            )}
          </List>
        </Collapse>

        {/* Production Module */}
        {isProductionUser && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setProductionOpen(!productionOpen)}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
                {productionOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={productionOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <ScienceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Batches" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        )}

        {/* Management Dashboard (Admin only) */}
        {currentUser?.role === 'admin' && (
          <ListItem disablePadding>
            <ListItemButton
              selected={location.pathname === '/management'}
              onClick={() => navigate('/management')}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Management" />
            </ListItemButton>
          </ListItem>
        )}

        {/* Settings (Admin only) */}
        {currentUser?.role === 'admin' && (
          <ListItem disablePadding>
            <ListItemButton
              selected={location.pathname === '/settings'}
              onClick={() => navigate('/settings')}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#000000',
          borderBottom: '1px solid #2a2a2a'
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {currentUser?.displayName || 'User'}
          </Typography>
          <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: '#ffffff', color: '#000000', fontWeight: 700 }}>
              {currentUser?.displayName?.charAt(0) || 'U'}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
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
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: '#000000',
              borderRight: '1px solid #2a2a2a'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: '#000000',
              borderRight: '1px solid #2a2a2a'
            },
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
          bgcolor: '#0a0a0a',
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
