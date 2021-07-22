import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

theme.typography.h5 = {
  fontSize: '1.25rem',

  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
};

export default theme;
