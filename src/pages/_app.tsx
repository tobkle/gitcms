import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';
import 'css/tailwind.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}
