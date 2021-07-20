import type { AppProps } from 'next/app';

import { UsersProvider } from '../context/UseUsersContext';

import { makeServer } from '../services/mirage';

makeServer();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UsersProvider>
      <Component {...pageProps} />
    </UsersProvider>
  );
}
export default MyApp;
