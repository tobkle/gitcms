import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'css/tailwind.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextAuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </NextAuthProvider>
  );
}
