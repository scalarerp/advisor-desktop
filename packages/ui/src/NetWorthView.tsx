import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NumberUtils } from 'number-utils';

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

interface NetWorthViewProps {
  investmentTotal: number;
  cashBalance: number;
}

export function NetWorthView({
  investmentTotal,
  cashBalance,
}: NetWorthViewProps) {
  return (
    <Box sx={{ p: 2, display: 'flex' }}>
      <Box>
        <LabelValue label="Net Worth" value={investmentTotal + cashBalance} />
      </Box>

      {/* show from small up */}
      <Box ml={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <LabelValue label="Investments" value={investmentTotal} />
      </Box>

      {/* show from medium up */}
      <Box ml={4} sx={{ display: { xs: 'none', md: 'block' } }}>
        <LabelValue label="Cash" value={cashBalance} />
      </Box>
    </Box>
  );
}

interface LabelValueProps {
  label: string;
  value: number;
}

function LabelValue({ label, value }: LabelValueProps) {
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        component="h2"
        sx={{ fontSize: '1rem', color: 'text.secondary' }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: '1.375rem',
          fontWeight: '500',
          lineHeight: 1.25,
          color: '#6366F1',
        }}
      >
        ${NumberUtils.formatAsMoney(value)}
      </Typography>
    </React.Fragment>
  );
}
