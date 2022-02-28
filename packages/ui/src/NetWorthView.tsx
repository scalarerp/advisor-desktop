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
    <Box sx={{ p: 1, display: 'flex' }}>
      {/* from xs to lg, show large font */}
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <LabelValue
          label="Net Worth"
          value={investmentTotal + cashBalance}
          isLarge={true}
        />
      </Box>

      {/* from large up, switch to small font */}
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <LabelValue label="Net Worth" value={investmentTotal + cashBalance} />
      </Box>

      {/* show from large up */}
      <Box ml={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <LabelValue label="Investments" value={investmentTotal} />
      </Box>

      {/* show from large up */}
      <Box ml={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <LabelValue label="Cash" value={cashBalance} />
      </Box>
    </Box>
  );
}

interface LabelValueProps {
  label: string;
  value: number;
  isLarge?: boolean;
}

function LabelValue({ label, value, isLarge = false }: LabelValueProps) {
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        component="h2"
        sx={{ textTransform: 'uppercase' }}
      >
        {label}
      </Typography>

      {!isLarge && (
        <Typography sx={{ fontSize: '1.25rem', lineHeight: 1.25 }}>
          ${NumberUtils.formatAsMoney(value)}
        </Typography>
      )}

      {isLarge && (
        <Typography sx={{ fontSize: '1.75rem', lineHeight: 1.25 }}>
          ${NumberUtils.formatAsMoney(value)}
        </Typography>
      )}
    </React.Fragment>
  );
}
