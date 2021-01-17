import { AppProps } from 'next/app'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SiteProvider } from 'hooks/use-site'
import 'css/tailwind.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextAuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <SiteProvider>
          <Component {...pageProps} />
        </SiteProvider>
      </QueryClientProvider>
    </NextAuthProvider>
  )
}
