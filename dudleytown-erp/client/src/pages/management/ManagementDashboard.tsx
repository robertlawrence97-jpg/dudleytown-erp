import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ManagementDashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Management Dashboard
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Management features coming soon.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ManagementDashboard;
