import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const List = styled('ul')({
  marginTop: 8,
  marginBottom: 8,
});

export function ClientInsights() {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Insights
      </Typography>

      <Box sx={{ display: 'flex' }}>
        <Divider
          orientation="vertical"
          sx={{ mr: 1, borderRightWidth: 4, borderRightColor: 'primary.main' }}
          flexItem
        />
        <Box>
          <Typography>
            Suggestions to increase the likelihood of your success for
            Retirement Goal from 60% to 95%:
          </Typography>
          <List>
            <li>
              <Typography>Increase savings rate to $3000/month</Typography>
            </li>
            <li>
              <Typography>
                Change your allocation to a slightly more aggressive model
              </Typography>
            </li>
          </List>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', mt: 2 }}>
        <Divider
          orientation="vertical"
          sx={{ mr: 1, borderRightWidth: 4, borderRightColor: 'primary.main' }}
          flexItem
        />
        <Box>
          <Typography>
            Your alternative investments underperformed by 70% compared to your
            equities. Consider allocating more of your money to equities to
            maximize your growth.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
