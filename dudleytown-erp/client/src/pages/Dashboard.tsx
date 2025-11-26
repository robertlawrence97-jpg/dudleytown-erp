import React from 'react';
import { Box, Typography, Paper, Grid2 as Grid } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to your Brewery ERP Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Active Batches</Typography>
            <Typography variant="h3">0</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Sales Orders</Typography>
            <Typography variant="h3">0</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Inventory Items</Typography>
            <Typography variant="h3">0</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Companies</Typography>
            <Typography variant="h3">0</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;