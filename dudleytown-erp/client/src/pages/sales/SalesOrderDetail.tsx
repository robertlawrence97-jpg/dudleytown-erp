import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const SalesOrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/sales/orders')}
        sx={{ mb: 2 }}
      >
        Back to Sales Orders
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Sales Order Detail
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Order ID: {id}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Sales order details will be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default SalesOrderDetail;
