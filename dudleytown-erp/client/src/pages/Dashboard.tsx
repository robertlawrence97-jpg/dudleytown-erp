import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to The Crypt
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: 3,
        mt: 3
      }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Active Batches
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            0
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Sales Orders
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            0
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Inventory Items
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            0
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Companies
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            0
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
