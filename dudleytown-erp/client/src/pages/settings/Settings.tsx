import React from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Settings: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ mt: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
          <Tab label="General" />
          <Tab label="Brewery Info" />
          <Tab label="User Management" />
          <Tab label="Integrations" />
        </Tabs>
        
        <TabPanel value={value} index={0}>
          <Typography variant="h6" gutterBottom>General Settings</Typography>
          <Typography variant="body2" color="text.secondary">
            General application settings will go here.
          </Typography>
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <Typography variant="h6" gutterBottom>Brewery Information</Typography>
          <Typography variant="body2" color="text.secondary">
            Brewery name, address, contact information, etc.
          </Typography>
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Typography variant="h6" gutterBottom>User Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage users, roles, and permissions.
          </Typography>
        </TabPanel>
        
        <TabPanel value={value} index={3}>
          <Typography variant="h6" gutterBottom>Integrations</Typography>
          <Typography variant="body2" color="text.secondary">
            Configure third-party integrations.
          </Typography>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Settings;
