import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const SalesOrdersList: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Sales Orders
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create Sales Order
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No sales orders yet. Click "Create Sales Order" to create your first order.
        </Typography>
      </Paper>
    </Box>
  );
};

export default SalesOrdersList;
