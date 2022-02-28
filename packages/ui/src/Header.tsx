import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          component="div"
          noWrap
          sx={{ fontSize: '1.125rem' }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
