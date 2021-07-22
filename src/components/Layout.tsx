import { ReactNode } from 'react';

import { Box, Container } from '@material-ui/core';

interface LayoutProps {
  children: ReactNode;
}
export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Container maxWidth="md">
      <Box mt={8}>{children}</Box>
    </Container>
  );
}
