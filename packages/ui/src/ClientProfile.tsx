import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Client } from 'advisor-models';

interface ClientProfileProps {
  client: Client;
}

export function ClientProfile({ client }: ClientProfileProps) {
  const { photo, name, email, phone, dob, retirementAge } = client;

  return (
    <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ p: 1 }}>
        <Avatar alt={name} src={photo} sx={{ width: 80, height: 80 }} />
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2">{phone}</Typography>
        <Typography variant="body2">{email}</Typography>
        <Typography variant="body2">
          Age: {calculateAge(dob)}, Retirement Age: {retirementAge}
        </Typography>
      </Box>
    </Box>
  );
}

function calculateAge(dateString: string) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
