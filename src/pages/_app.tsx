import '../../dist/output.css'
import type { AppProps } from 'next/app'
import { AppLayout } from 'components/Utils/AppLayout'
import { AuthUserProvider } from 'context/authUserContext'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <AuthUserProvider>
        <Component {...pageProps}/>
      </AuthUserProvider>
    </AppLayout>
  )
}
