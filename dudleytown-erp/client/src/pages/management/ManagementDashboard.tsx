import React from 'react';
import { Box, Typography, Paper, Grid2 as Grid } from '@mui/material';

const ManagementDashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Management Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Overview of brewery operations and performance metrics
      </Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Production Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Production metrics will be displayed here.
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sales Performance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sales metrics will be displayed here.
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Inventory Status
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inventory metrics will be displayed here.
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Financial Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Financial metrics will be displayed here.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagementDashboard;