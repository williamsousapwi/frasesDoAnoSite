import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useRouter } from 'next/router'

import { getRanking } from '@/services/FraseDoAnoService/api'
import { FraseDoAnoRankingListProps } from '@/services/FraseDoAnoService/types'
import * as storage from 'local-storage'

export default function () {
  const router = useRouter()
  const [frase, setFrase] = useState <FraseDoAnoRankingListProps[]>([])
  const [loading, setLoading] = useState(false)

  async function CarregarRanking () {
    try {
      setLoading(true)
      const resp = await getRanking()
      setFrase(resp.data)
    } catch (error) {
      toast('Erro Interno')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!storage.get('usuario-logado')) {
      router.push('http://localhost:3005/LoginPage/login')
    }
    CarregarRanking()
  }, [])
  return (
    <main className='RankingDeFrases-Main'>
      <div className='Div-Imagem'> <div className='Logo-Imagem' /> </div>
      <section className='Faixa-2-Login'>
        <section className='F1-Card-Ranking'>
          {frase.length === 0 && !loading &&
            <h1>Nenhuma frase foi encontrada...😞</h1>}
          {frase.length >= 1 &&
            <h1> Ranking de Frases 🏆</h1>}
          {loading && <div className='Load' />}
          {!loading && frase.map((item, index) =>
            <div className='Card-F2' key={index}>
              <h4 className='Card-F2-h4' title={item.phrase}> Frase - {item.phrase.length >= 35 ? item.phrase.substring(0, 35) + '...' : item.phrase}  </h4>
              <h4 className='Card-F2-h4' title={item.observation}> Observação - {item.observation.length >= 35 ? item.observation.substring(0, 30) + '...' : item.observation} </h4>
              <h4 className='Card-F2-h4' title={item.creator}> Cadastrado por - {item.creator.length >= 35 ? item.creator.substring(0, 35) + '...' : item.creator}  </h4>
              <h4 className='Card-F2-h4'> Quantidade de Votos -  {item.qtdVotes}</h4>
            </div>
          )}

        </section>
      </section>

    </main>
  )
}