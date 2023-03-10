import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '@/pages/FraseDoAno/home.css'
import '@/pages/LoginPage/login.css'
import '@/pages/CadastroPage/cadastro.css'
import '@/pages/RankingDeFrases/rankingDeFrases.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import type { AppProps } from 'next/app'

export default function App ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
