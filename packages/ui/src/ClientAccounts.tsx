import * as React from 'react';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Account } from 'advisor-models';
import { Divider } from '@mui/material';

interface ClientAccountProps {
  accounts: Array<Account>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function ClientAccounts({ accounts, onClick }: ClientAccountProps) {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" component="h2">
        Accounts
      </Typography>
      {accounts.length === 0 && <Typography>Client has no accounts</Typography>}
      {accounts.length > 0 && (
        <List>
          {accounts.map((account, index) => {
            const { id, name, accountNumber } = account;
            return (
              <React.Fragment key={id}>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="navigate"
                      id={id}
                      onClick={onClick}
                    >
                      <ArrowForward />
                    </IconButton>
                  }
                >
                  <ListItemText primary={name} secondary={accountNumber} />
                </ListItem>
                {index < accounts.length - 1 && <Divider component="li" />}
              </React.Fragment>
            );
          })}
        </List>
      )}
    </Box>
  );
}
