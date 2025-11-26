import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ManagementDashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Management Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Overview of brewery operations and performance metrics
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Production Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Production metrics will be displayed here.
          </Typography>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Sales Performance
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sales metrics will be displayed here.
          </Typography>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Inventory Status
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Inventory metrics will be displayed here.
          </Typography>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Financial Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Financial metrics will be displayed here.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ManagementDashboard;

