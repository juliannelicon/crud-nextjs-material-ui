import type { AppProps } from 'next/app';

import { ThemeProvider } from '@material-ui/core/styles';

import { UsersProvider } from '../context/UseUsersContext';

import theme from '../styles/theme';

import { Layout } from '../components/Layout';

import { makeServer } from '../services/mirage';

makeServer();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UsersProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UsersProvider>
  );
}
export default MyApp;
