import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Switch,
  MenuItem,
  Grid,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  ListAlt as ListIcon,
  Email as EmailIcon,
  AccountBalance as AccountBalanceIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Extension as ExtensionIcon,
  Straighten as StraightenIcon,
} from '@mui/icons-material';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../config/firebase';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'production' | 'sales';
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

interface BrewerySettings {
  name: string;
  abbreviation: string;
  ein: string;
  licenseNumber: string;
  companyNumber: string;
  telephone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  defaultDateFormat: string;
  defaultTimezone: string;
  includePOInForecast: boolean;
  itemReorderNotificationBy: string;
  kegReturnLocation: string;
}

const Settings: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('users');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Users State
  const [users, setUsers] = useState<User[]>([]);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userTab, setUserTab] = useState(0);
  const [newUser, setNewUser] = useState({
    email: '',
    displayName: '',
    password: '',
    role: 'sales' as 'admin' | 'production' | 'sales',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Brewery Settings State
  const [brewerySettings, setBrewerySettings] = useState<BrewerySettings>({
    name: 'Dudleytown Brewing Company',
    abbreviation: 'DTB',
    ein: '',
    licenseNumber: '',
    companyNumber: '',
    telephone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    defaultDateFormat: 'MM/DD/YYYY',
    defaultTimezone: 'America/New_York',
    includePOInForecast: false,
    itemReorderNotificationBy: '',
    kegReturnLocation: '',
  });

  useEffect(() => {
    if (selectedSection === 'users') {
      loadUsers();
    } else if (selectedSection === 'facility') {
      loadBrewerySettings();
    }
  }, [selectedSection]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        lastLoginAt: doc.data().lastLoginAt?.toDate(),
      })) as User[];
      setUsers(usersData);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Failed to load users');
    }
    setLoading(false);
  };

  const loadBrewerySettings = async () => {
    setLoading(true);
    try {
      const settingsDoc = await getDoc(doc(db, 'settings', 'brewery'));
      if (settingsDoc.exists()) {
        setBrewerySettings(prev => ({ ...prev, ...settingsDoc.data() }));
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    }
    setLoading(false);
  };

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      // Create Firestore user document
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: newUser.email,
        displayName: newUser.displayName,
        role: newUser.role,
        isActive: true,
        createdAt: new Date(),
      });

      setSuccess('User created successfully!');
      setUserDialogOpen(false);
      setNewUser({ email: '', displayName: '', password: '', role: 'sales' });
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error creating user');
      setTimeout(() => setError(''), 3000);
    }
    setLoading(false);
  };

  const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
    try {
      await updateDoc(doc(db, 'users', userId), updates);
      setSuccess('User updated successfully!');
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error updating user');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteDoc(doc(db, 'users', userId));
      setSuccess('User deleted successfully!');
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error deleting user');
      setTimeout(() => setError(''), 3000);
    }
  };

  const saveBrewerySettings = async () => {
    try {
      setLoading(true);
      await setDoc(doc(db, 'settings', 'brewery'), brewerySettings);
      setSuccess('Brewery settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error saving settings');
      setTimeout(() => setError(''), 3000);
    }
    setLoading(false);
  };

  const filteredUsers = users.filter(user =>
    (userTab === 0 ? user.isActive : true) &&
    (user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderUsersSection = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Users & Security</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setUserDialogOpen(true)}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ mb: 2 }}>
        <Tabs value={userTab} onChange={(_, v) => setUserTab(v)}>
          <Tab label="Enabled Users" />
          <Tab label="All Users" />
        </Tabs>
      </Paper>

      <TextField
        fullWidth
        placeholder="Search by Full Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.displayName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    color={user.role === 'admin' ? 'error' : user.role === 'production' ? 'warning' : 'primary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.isActive}
                    onChange={(e) => handleUpdateUser(user.id, { isActive: e.target.checked })}
                  />
                </TableCell>
                <TableCell>
                  {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderFacilitySection = () => (
    <Box>
      <Typography variant="h5" gutterBottom>Facility Settings</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Facility Info</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={brewerySettings.name}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Abbreviation"
              value={brewerySettings.abbreviation}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, abbreviation: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company EIN"
              value={brewerySettings.ein}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, ein: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company Number"
              value={brewerySettings.companyNumber}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, companyNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="State/Provincial License #"
              value={brewerySettings.licenseNumber}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, licenseNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Telephone"
              value={brewerySettings.telephone}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, telephone: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Address</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={brewerySettings.address}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="City"
              value={brewerySettings.city}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, city: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="State"
              value={brewerySettings.state}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, state: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Zip Code"
              value={brewerySettings.zipCode}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, zipCode: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Country"
              value={brewerySettings.country}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, country: e.target.value })}
            >
              <MenuItem value="United States">United States</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>General Settings</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Default Date Format"
              value={brewerySettings.defaultDateFormat}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, defaultDateFormat: e.target.value })}
            >
              <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
              <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
              <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Default Timezone"
              value={brewerySettings.defaultTimezone}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, defaultTimezone: e.target.value })}
            >
              <MenuItem value="America/New_York">Eastern Time</MenuItem>
              <MenuItem value="America/Chicago">Central Time</MenuItem>
              <MenuItem value="America/Denver">Mountain Time</MenuItem>
              <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Switch
              checked={brewerySettings.includePOInForecast}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, includePOInForecast: e.target.checked })}
            />
            <Typography component="span" sx={{ ml: 1 }}>Include PO In Forecast</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Item Reorder Notification By"
              value={brewerySettings.itemReorderNotificationBy}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, itemReorderNotificationBy: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Keg Return Location"
              value={brewerySettings.kegReturnLocation}
              onChange={(e) => setBrewerySettings({ ...brewerySettings, kegReturnLocation: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={saveBrewerySettings}
        disabled={loading}
      >
        Save Facility Settings
      </Button>
    </Box>
  );

  const renderPlaceholderSection = (title: string) => (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography color="text.secondary">
          This section is coming soon.
        </Typography>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <Paper sx={{ width: 280, borderRadius: 0, borderRight: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsIcon /> Management Settings
          </Typography>
        </Box>
        <List>
          <ListItemButton
            selected={selectedSection === 'users'}
            onClick={() => setSelectedSection('users')}
          >
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Users & Security" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === 'integrations'}
            onClick={() => setSelectedSection('integrations')}
          >
            <ListItemIcon><ExtensionIcon /></ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === 'facility'}
            onClick={() => setSelectedSection('facility')}
          >
            <ListItemIcon><BusinessIcon /></ListItemIcon>
            <ListItemText primary="Facility Settings" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === 'uom'}
            onClick={() => setSelectedSection('uom')}
          >
            <ListItemIcon><StraightenIcon /></ListItemIcon>
            <ListItemText primary="Unit of Measure Settings" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === 'lists'}
            onClick={() => setSelectedSection('lists')}
          >
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="Customize List Options" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === 'email'}
            onClick={() => setSelectedSection('email')}
          >
            <ListItemIcon><EmailIcon /></ListItemIcon>
            <ListItemText primary="Email Templates" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === 'cost'}
            onClick={() => setSelectedSection('cost')}
          >
            <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
            <ListItemText primary="Cost Centers" />
          </ListItemButton>
        </List>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {selectedSection === 'users' && renderUsersSection()}
        {selectedSection === 'facility' && renderFacilitySection()}
        {selectedSection === 'integrations' && renderPlaceholderSection('Integrations')}
        {selectedSection === 'uom' && renderPlaceholderSection('Unit of Measure Settings')}
        {selectedSection === 'lists' && renderPlaceholderSection('Customize List Options')}
        {selectedSection === 'email' && renderPlaceholderSection('Email Templates')}
        {selectedSection === 'cost' && renderPlaceholderSection('Cost Centers')}
      </Box>

      {/* Add User Dialog */}
      <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Display Name"
              value={newUser.displayName}
              onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <TextField
              fullWidth
              select
              label="Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
            >
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="production">Production</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateUser} variant="contained" disabled={loading}>
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
