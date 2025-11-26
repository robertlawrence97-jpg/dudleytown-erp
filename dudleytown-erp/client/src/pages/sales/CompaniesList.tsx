import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const CompaniesList: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Companies
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Company
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No companies yet. Click "Add Company" to create your first company.
        </Typography>
      </Paper>
    </Box>
  );
};

export default CompaniesList;
