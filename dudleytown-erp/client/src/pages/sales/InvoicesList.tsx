import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const InvoicesList: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Invoices
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create Invoice
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No invoices yet. Click "Create Invoice" to create your first invoice.
        </Typography>
      </Paper>
    </Box>
  );
};

export default InvoicesList;
