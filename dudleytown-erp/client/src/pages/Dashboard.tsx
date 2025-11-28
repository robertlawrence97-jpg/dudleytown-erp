import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#000000', minHeight: '100vh' }}>
      {/* Logo Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mb: 4,
        borderBottom: '1px solid #2a2a2a',
        pb: 3
      }}>
        <img 
          src={`${process.env.PUBLIC_URL}/dtb_logo.png`}
          alt="Dudleytown Brewing Co." 
          style={{ 
            maxWidth: '600px', 
            width: '100%',
            height: 'auto'
          }} 
          onError={(e) => {
            // Hide image if it fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      </Box>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#ffffff' }}>
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ color: '#999999', mb: 3 }}>
        Welcome to The Crypt
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        <Paper sx={{ p: 3, bgcolor: '#e0e0e0', border: '1px solid #2a2a2a' }}>
          <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>Active Batches</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000000' }}>0</Typography>
        </Paper>
        <Paper sx={{ p: 3, bgcolor: '#e0e0e0', border: '1px solid #2a2a2a' }}>
          <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>Sales Orders</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000000' }}>0</Typography>
        </Paper>
        <Paper sx={{ p: 3, bgcolor: '#e0e0e0', border: '1px solid #2a2a2a' }}>
          <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>Inventory Items</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000000' }}>0</Typography>
        </Paper>
        <Paper sx={{ p: 3, bgcolor: '#e0e0e0', border: '1px solid #2a2a2a' }}>
          <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>Companies</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000000' }}>0</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
