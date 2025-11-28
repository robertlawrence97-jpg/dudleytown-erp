import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const InventoryItemDetail: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Item Detail
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1" color="text.secondary">
          This feature is coming soon.
        </Typography>
      </Paper>
    </Box>
  );
};

export default InventoryItemDetail;
