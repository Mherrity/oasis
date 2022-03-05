import '../styles/globals.css'
import '../components/Solana/walletConnect.css'
import type { AppProps } from 'next/app'
import App from 'next/app';
import {Solana} from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  
      <Solana.WalletConnect>
        <Component {...pageProps} />
      </Solana.WalletConnect>
  
  )
}

export default MyApp
