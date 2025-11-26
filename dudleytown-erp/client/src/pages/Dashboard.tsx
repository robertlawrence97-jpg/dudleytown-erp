import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to your Brewery ERP Dashboard
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Active Batches</Typography>
          <Typography variant="h3">0</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Sales Orders</Typography>
          <Typography variant="h3">0</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Inventory Items</Typography>
          <Typography variant="h3">0</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Companies</Typography>
          <Typography variant="h3">0</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
